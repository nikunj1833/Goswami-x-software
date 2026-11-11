import { NextResponse } from "next/server";
import crypto from "crypto";
import { contactFormSchema } from "@/lib/validations/contact";
import { checkRateLimit, getClientIp } from "@/lib/security/rateLimit";
import {
  getAdminApp,
  hasFirebaseServerCredentials,
  FieldValue,
} from "@/lib/firebase/admin";
import { sendInquiryEmailNotification } from "@/lib/email/client";
import { sendInquiryWhatsAppTemplateNotification } from "@/lib/whatsapp/client";

export const dynamic = "force-dynamic";

interface DevInflightSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  phoneNumber: string | null;
  submissionHash: string;
  clientIp: string;
  userAgent: string;
  createdAt: number;
  emailStatus?: string;
  whatsappStatus?: string;
}

// In-memory fallback store ONLY used in local development (NODE_ENV !== "production")
const devMemorySubmissions = new Map<string, DevInflightSubmission>();

export async function POST(request: Request) {
  const isProduction = process.env.NODE_ENV === "production";

  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Malformed request payload. Please provide valid JSON.",
        },
        { status: 400 }
      );
    }

    const parseResult = contactFormSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: parseResult.error.issues[0]?.message || "Invalid contact form input.",
        },
        { status: 400 }
      );
    }

    const clientIp = getClientIp(request);

    // Rate limit: max 5 contact submissions per hour per IP
    const rateLimit = await checkRateLimit(`contact_ip:${clientIp}`, 5, 3600);
    if (!rateLimit.allowed) {
      if (rateLimit.unavailable) {
        return NextResponse.json(
          {
            success: false,
            error: "We couldn't securely save your inquiry right now. Please try again later or contact us directly.",
          },
          { status: 503 }
        );
      }
      return NextResponse.json(
        {
          success: false,
          error: "You have sent several messages recently. Please wait before submitting another inquiry.",
        },
        { status: 429 }
      );
    }

    const { name, email, message, phoneNumber } = parseResult.data;

    // Idempotency: generate hash of email + message to prevent rapid duplicate spam
    const submissionHash = crypto
      .createHash("sha256")
      .update(`${email}:${message}`)
      .digest("hex");

    const nowMs = Date.now();
    const fiveMinutesAgoMs = nowMs - 5 * 60 * 1000;
    const createdAtIso = new Date().toISOString();
    const userAgent = request.headers.get("user-agent") || "unknown";

    // ------------------------------------------------------------------------
    // PRODUCTION MODE: Strict Firestore verification (Zero in-memory fallback)
    // ------------------------------------------------------------------------
    if (isProduction) {
      if (!hasFirebaseServerCredentials()) {
        console.error("[Contact Form] Missing required Firebase server credentials in production.");
        return NextResponse.json(
          {
            success: false,
            error: "We couldn't securely save your inquiry right now. Please try again later or contact us directly.",
          },
          { status: 503 }
        );
      }

      let db: FirebaseFirestore.Firestore;
      try {
        db = getAdminApp().db;
      } catch (adminErr) {
        console.error(
          "[Contact Form] Failed to initialize Firebase Admin in production:",
          adminErr instanceof Error ? adminErr.message : adminErr
        );
        return NextResponse.json(
          {
            success: false,
            error: "We couldn't securely save your inquiry right now. Please try again later or contact us directly.",
          },
          { status: 503 }
        );
      }

      // Check for recent duplicate within 5 minutes in Firestore (single-field index safe)
      try {
        const existingDuplicates = await db
          .collection("contactSubmissions")
          .where("submissionHash", "==", submissionHash)
          .limit(5)
          .get();

        const isRecentDuplicate =
          !existingDuplicates.empty &&
          existingDuplicates.docs.some((doc) => {
            const data = doc.data();
            const createdAtMs =
              typeof data.createdAt?.toMillis === "function"
                ? data.createdAt.toMillis()
                : data.createdAtIso
                ? new Date(data.createdAtIso).getTime()
                : 0;
            return createdAtMs >= fiveMinutesAgoMs;
          });

        if (isRecentDuplicate) {
          // Idempotent: return success without duplicate writes or notifications
          return NextResponse.json({
            success: true,
            message: "Your message has already been received. Thank you!",
          });
        }
      } catch (dupErr) {
        console.error(
          "[Contact Form] Firestore duplicate check failed in production:",
          dupErr instanceof Error ? dupErr.message : dupErr
        );
        return NextResponse.json(
          {
            success: false,
            error: "We couldn't securely save your inquiry right now. Please try again later or contact us directly.",
          },
          { status: 503 }
        );
      }

      // Step 3: Primary Source of Truth — Atomic transaction write with concurrency lock
      const submissionId = crypto.randomUUID();
      const idempotencyRef = db.collection("rateLimits").doc(`idempotency_${submissionHash}`);
      const submissionRef = db.collection("contactSubmissions").doc(submissionId);
      let isConcurrentDuplicate = false;

      try {
        await db.runTransaction(async (transaction) => {
          const lockDoc = await transaction.get(idempotencyRef);
          if (lockDoc.exists) {
            const data = lockDoc.data();
            const expiresAtMs = typeof data?.expiresAtMs === "number" ? data.expiresAtMs : 0;
            if (nowMs < expiresAtMs) {
              isConcurrentDuplicate = true;
              return;
            }
          }

          transaction.set(idempotencyRef, {
            submissionId,
            submissionHash,
            createdAtMs: nowMs,
            expiresAtMs: nowMs + 5 * 60 * 1000,
          });

          transaction.set(submissionRef, {
            id: submissionId,
            name,
            email,
            phoneNumber: phoneNumber || null,
            message,
            submissionHash,
            clientIp,
            userAgent: userAgent.slice(0, 200),
            createdAt: FieldValue.serverTimestamp(),
            createdAtIso,
            status: "new",
            emailNotification: {
              status: "pending",
              attemptedAt: null,
              sentAt: null,
              messageId: null,
              errorCode: null,
              error: null,
            },
            whatsappNotification: {
              status: "pending",
              attemptedAt: null,
              sentAt: null,
              messageId: null,
              errorCode: null,
              error: null,
            },
          });
        });

        if (isConcurrentDuplicate) {
          return NextResponse.json({
            success: true,
            message: "Your message has already been received. Thank you!",
          });
        }
      } catch (writeErr) {
        console.error(
          "[Contact Form] Permanent Firestore write failed in production:",
          writeErr instanceof Error ? writeErr.message : writeErr
        );
        return NextResponse.json(
          {
            success: false,
            error: "We couldn't securely save your inquiry right now. Please try again later or contact us directly.",
          },
          { status: 503 }
        );
      }

      // Step 4 & 5: Trigger Email and WhatsApp notifications concurrently AFTER Firestore write
      const [emailResult, whatsappResult] = await Promise.all([
        sendInquiryEmailNotification({
          id: submissionId,
          name,
          email,
          phoneNumber: phoneNumber || null,
          message,
          createdAtIso,
        }),
        sendInquiryWhatsAppTemplateNotification({
          id: submissionId,
          name,
          email,
          phoneNumber: phoneNumber || null,
          message,
          createdAtIso,
        }),
      ]);

      // Update Firestore document with exact delivery status
      try {
        await db.collection("contactSubmissions").doc(submissionId).update({
          emailNotification: {
            status: emailResult.status,
            attemptedAt: emailResult.attemptedAt,
            sentAt: emailResult.sentAt || null,
            messageId: emailResult.messageId || null,
            errorCode: emailResult.errorCode || null,
            error: emailResult.error || null,
          },
          whatsappNotification: {
            status: whatsappResult.status,
            attemptedAt: whatsappResult.attemptedAt,
            sentAt: whatsappResult.sentAt || null,
            messageId: whatsappResult.messageId || null,
            errorCode: whatsappResult.errorCode || null,
            error: whatsappResult.error || null,
          },
          notificationDispatchedAt: FieldValue.serverTimestamp(),
        });
      } catch (updateErr) {
        console.warn(
          "[Contact Form] Notification status update warning:",
          updateErr instanceof Error ? updateErr.message : updateErr
        );
      }

      return NextResponse.json({
        success: true,
        message: "Thank you for reaching out! Your inquiry has been received.",
      });
    }

    // ------------------------------------------------------------------------
    // DEVELOPMENT MODE: Resilient local development with clear dev feedback
    // ------------------------------------------------------------------------
    let firestorePersisted = false;
    const submissionId = crypto.randomUUID();

    if (hasFirebaseServerCredentials()) {
      try {
        const { db } = getAdminApp();
        const existingDuplicates = await db
          .collection("contactSubmissions")
          .where("submissionHash", "==", submissionHash)
          .limit(5)
          .get();

        const isRecentDuplicate =
          !existingDuplicates.empty &&
          existingDuplicates.docs.some((doc) => {
            const data = doc.data();
            const createdAtMs =
              typeof data.createdAt?.toMillis === "function"
                ? data.createdAt.toMillis()
                : data.createdAtIso
                ? new Date(data.createdAtIso).getTime()
                : 0;
            return createdAtMs >= fiveMinutesAgoMs;
          });

        if (isRecentDuplicate) {
          return NextResponse.json({
            success: true,
            message: "Your message has already been received. Thank you!",
          });
        }

        await db.collection("contactSubmissions").doc(submissionId).set({
          id: submissionId,
          name,
          email,
          phoneNumber: phoneNumber || null,
          message,
          submissionHash,
          clientIp,
          userAgent: userAgent.slice(0, 200),
          createdAt: FieldValue.serverTimestamp(),
          createdAtIso,
          status: "new",
          emailNotification: {
            status: "pending",
            attemptedAt: null,
            sentAt: null,
            messageId: null,
            errorCode: null,
            error: null,
          },
          whatsappNotification: {
            status: "pending",
            attemptedAt: null,
            sentAt: null,
            messageId: null,
            errorCode: null,
            error: null,
          },
        });
        firestorePersisted = true;
      } catch (dbErr) {
        console.warn(
          "[Contact Form Dev] Firestore write skipped/failed, using in-memory fallback:",
          dbErr instanceof Error ? dbErr.message : dbErr
        );
      }
    }

    if (!firestorePersisted) {
      // Purge entries older than 1 hour in dev memory
      const oneHourAgoMs = nowMs - 60 * 60 * 1000;
      for (const [key, item] of devMemorySubmissions.entries()) {
        if (item.createdAt < oneHourAgoMs) {
          devMemorySubmissions.delete(key);
        }
      }

      // Check dev in-memory duplicate
      for (const item of devMemorySubmissions.values()) {
        if (item.submissionHash === submissionHash && item.createdAt >= fiveMinutesAgoMs) {
          return NextResponse.json({
            success: true,
            message: "Your message has already been received. Thank you!",
          });
        }
      }

      devMemorySubmissions.set(submissionId, {
        id: submissionId,
        name,
        email,
        message,
        phoneNumber: phoneNumber || null,
        submissionHash,
        clientIp,
        userAgent: userAgent.slice(0, 200),
        createdAt: nowMs,
      });
    }

    // Trigger dev notifications
    const [emailResult, whatsappResult] = await Promise.all([
      sendInquiryEmailNotification({
        id: submissionId,
        name,
        email,
        phoneNumber: phoneNumber || null,
        message,
        createdAtIso,
      }),
      sendInquiryWhatsAppTemplateNotification({
        id: submissionId,
        name,
        email,
        phoneNumber: phoneNumber || null,
        message,
        createdAtIso,
      }),
    ]);

    if (firestorePersisted) {
      try {
        const { db } = getAdminApp();
        await db.collection("contactSubmissions").doc(submissionId).update({
          emailNotification: {
            status: emailResult.status,
            attemptedAt: emailResult.attemptedAt,
            sentAt: emailResult.sentAt || null,
            messageId: emailResult.messageId || null,
            errorCode: emailResult.errorCode || null,
            error: emailResult.error || null,
          },
          whatsappNotification: {
            status: whatsappResult.status,
            attemptedAt: whatsappResult.attemptedAt,
            sentAt: whatsappResult.sentAt || null,
            messageId: whatsappResult.messageId || null,
            errorCode: whatsappResult.errorCode || null,
            error: whatsappResult.error || null,
          },
          notificationDispatchedAt: FieldValue.serverTimestamp(),
        });
      } catch {}
    } else {
      const devEntry = devMemorySubmissions.get(submissionId);
      if (devEntry) {
        devEntry.emailStatus = emailResult.status;
        devEntry.whatsappStatus = whatsappResult.status;
      }
    }

    return NextResponse.json({
      success: true,
      message: firestorePersisted
        ? "Thank you for reaching out! Your inquiry has been received."
        : "Thank you for reaching out! (Saved in local development fallback mode)",
    });
  } catch (err) {
    console.error("[Contact Form Error]", err);
    return NextResponse.json(
      {
        success: false,
        error: "We couldn't securely save your inquiry right now. Please try again later or contact us directly.",
      },
      { status: 500 }
    );
  }
}
