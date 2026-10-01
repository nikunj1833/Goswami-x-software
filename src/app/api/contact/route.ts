import { NextResponse } from "next/server";
import crypto from "crypto";
import { contactFormSchema } from "@/lib/validations/contact";
import { checkRateLimit, getClientIp } from "@/lib/security/rateLimit";
import { getAdminApp, FieldValue, Timestamp } from "@/lib/firebase/admin";
import { sendWhatsAppAdminAlert } from "@/lib/whatsapp/client";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
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

    const { db } = getAdminApp();

    // Check for recent duplicate within 5 minutes
    const fiveMinutesAgo = Timestamp.fromMillis(Date.now() - 5 * 60 * 1000);
    const existingDuplicates = await db
      .collection("contactSubmissions")
      .where("submissionHash", "==", submissionHash)
      .where("createdAt", ">=", fiveMinutesAgo)
      .limit(1)
      .get();

    if (!existingDuplicates.empty) {
      // Idempotent: return success without double writing
      return NextResponse.json({
        success: true,
        message: "Your message has already been received. Thank you!",
      });
    }

    const submissionId = crypto.randomUUID();
    const userAgent = request.headers.get("user-agent") || "unknown";

    await db.collection("contactSubmissions").doc(submissionId).set({
      id: submissionId,
      name,
      email,
      message,
      phoneNumber: phoneNumber || null,
      submissionHash,
      clientIp,
      userAgent: userAgent.slice(0, 200),
      createdAt: FieldValue.serverTimestamp(),
      status: "new",
    });

    // Optional admin notification via WhatsApp
    const adminPhone = process.env.ADMIN_NOTIFICATION_PHONE_NUMBER;
    if (adminPhone) {
      const alertText = `📬 *New Project Inquiry*\n\n*Name:* ${name}\n*Email:* ${email}\n*Message:* ${message.slice(
        0,
        250
      )}${message.length > 250 ? "..." : ""}`;
      sendWhatsAppAdminAlert(adminPhone, alertText).catch(() => {});
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for reaching out! Your message has been sent successfully.",
    });
  } catch (err) {
    console.error("[Contact Form Error]", err);
    return NextResponse.json(
      {
        success: false,
        error: "Unable to process your message at this time. Please try again later.",
      },
      { status: 500 }
    );
  }
}
