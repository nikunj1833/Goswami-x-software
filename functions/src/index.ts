import * as functions from "firebase-functions/v2";
import * as admin from "firebase-admin";
import * as crypto from "crypto";
import { parsePhoneNumberFromString } from "libphonenumber-js";

if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();
const auth = admin.auth();

function getSecret(name: string, fallback = ""): string {
  return process.env[name] || fallback;
}

function hashOtp(code: string, phoneNumberE164: string): string {
  const secret = getSecret("AUTH_CHALLENGE_HMAC_SECRET", "goswami_cloud_functions_secret");
  return crypto.createHmac("sha256", secret).update(`${phoneNumberE164}:${code}`).digest("hex");
}

/**
 * 1. Cloud Function: Start WhatsApp Authentication
 */
export const startWhatsAppAuth = functions.https.onCall(async (request) => {
  const { phoneNumber, displayName } = request.data || {};

  if (!phoneNumber || typeof phoneNumber !== "string") {
    throw new functions.https.HttpsError("invalid-argument", "Phone number is required.");
  }

  const parsed = parsePhoneNumberFromString(phoneNumber.trim(), "IN");
  if (!parsed || !parsed.isValid()) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Invalid phone number format. Provide valid number with country code."
    );
  }

  const e164 = parsed.number;

  // Rate limit: max 3 per 10 minutes
  const now = Date.now();
  const rateLimitRef = db.collection("rateLimits").doc(`cf_auth_${e164}`);
  const rateLimitDoc = await rateLimitRef.get();

  if (rateLimitDoc.exists) {
    const data = rateLimitDoc.data()!;
    const resetAt = data.resetAt ? data.resetAt.toMillis() : now;
    if (now < resetAt && data.count >= 3) {
      throw new functions.https.HttpsError(
        "resource-exhausted",
        "Too many verification requests. Please wait a few minutes."
      );
    }
  }

  await rateLimitRef.set({
    count: admin.firestore.FieldValue.increment(1),
    resetAt: admin.firestore.Timestamp.fromMillis(now + 10 * 60 * 1000),
  });

  const challengeId = crypto.randomUUID();
  const code = crypto.randomInt(100000, 1000000).toString();
  const hashedCode = hashOtp(code, e164);

  await db.collection("authChallenges").doc(challengeId).set({
    challengeId,
    phoneNumberNormalized: e164,
    displayName: displayName || null,
    hashedCode,
    attempts: 0,
    maxAttempts: 5,
    expiresAt: admin.firestore.Timestamp.fromMillis(now + 10 * 60 * 1000),
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    used: false,
  });

  // Call Meta WhatsApp Cloud API
  const phoneId = getSecret("WHATSAPP_PHONE_NUMBER_ID");
  const token = getSecret("WHATSAPP_ACCESS_TOKEN");

  if (phoneId && token) {
    const recipient = e164.replace(/^\+/, "");
    await fetch(`https://graph.facebook.com/v21.0/${phoneId}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: recipient,
        type: "text",
        text: {
          preview_url: false,
          body: `Your Goswami X Software verification code is: *${code}*.\n\nValid for 10 minutes. Do not share this code.`,
        },
      }),
    });
  }

  return {
    success: true,
    challengeId,
    formattedPhone: parsed.formatInternational(),
  };
});

/**
 * 2. Cloud Function: Verify WhatsApp Code & Create Custom Token
 */
export const verifyWhatsAppAuth = functions.https.onCall(async (request) => {
  const { challengeId, code } = request.data || {};

  if (!challengeId || !code) {
    throw new functions.https.HttpsError("invalid-argument", "challengeId and code are required.");
  }

  const challengeRef = db.collection("authChallenges").doc(challengeId);
  const challengeDoc = await challengeRef.get();

  if (!challengeDoc.exists) {
    throw new functions.https.HttpsError("not-found", "Verification session not found.");
  }

  const challenge = challengeDoc.data()!;
  if (challenge.used) {
    throw new functions.https.HttpsError("failed-precondition", "Code already used.");
  }

  if (Date.now() > challenge.expiresAt.toMillis()) {
    throw new functions.https.HttpsError("deadline-exceeded", "Code expired.");
  }

  const expectedHash = hashOtp(code.trim(), challenge.phoneNumberNormalized);
  if (expectedHash !== challenge.hashedCode) {
    await challengeRef.update({ attempts: admin.firestore.FieldValue.increment(1) });
    throw new functions.https.HttpsError("permission-denied", "Incorrect verification code.");
  }

  await challengeRef.update({
    used: true,
    usedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  const phoneNumberNormalized = challenge.phoneNumberNormalized;

  let uid: string;
  try {
    const existing = await auth.getUserByPhoneNumber(phoneNumberNormalized);
    uid = existing.uid;
  } catch {
    const newUser = await auth.createUser({
      phoneNumber: phoneNumberNormalized,
      displayName: challenge.displayName || undefined,
    });
    uid = newUser.uid;
  }

  const userRef = db.collection("users").doc(uid);
  const userDoc = await userRef.get();

  if (!userDoc.exists) {
    await userRef.set({
      uid,
      phoneNumber: phoneNumberNormalized,
      phoneNumberNormalized,
      displayName: challenge.displayName || `User ${phoneNumberNormalized.slice(-4)}`,
      email: null,
      photoURL: null,
      role: "user",
      status: "active",
      authProvider: "whatsapp",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      lastLoginAt: admin.firestore.FieldValue.serverTimestamp(),
      lastSeenAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  } else {
    await userRef.update({
      lastLoginAt: admin.firestore.FieldValue.serverTimestamp(),
      lastSeenAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  }

  const customToken = await auth.createCustomToken(uid, {
    role: userDoc.exists ? userDoc.data()!.role || "user" : "user",
    authProvider: "whatsapp",
  });

  return {
    success: true,
    customToken,
    uid,
  };
});

/**
 * 3. Cloud Function: Submit Contact Form
 */
export const submitContactInquiry = functions.https.onCall(async (request) => {
  const { name, email, message, phoneNumber } = request.data || {};

  if (!name || !email || !message) {
    throw new functions.https.HttpsError("invalid-argument", "Name, email, and message are required.");
  }

  const submissionId = crypto.randomUUID();
  await db.collection("contactSubmissions").doc(submissionId).set({
    id: submissionId,
    name: name.slice(0, 100),
    email: email.slice(0, 150).toLowerCase(),
    message: message.slice(0, 3000),
    phoneNumber: phoneNumber ? phoneNumber.slice(0, 30) : null,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    status: "new",
  });

  return { success: true };
});

/**
 * 4. Cloud Function: WhatsApp Webhook
 */
export const whatsappWebhook = functions.https.onRequest(async (req, res) => {
  if (req.method === "GET") {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    const verifyToken = getSecret("WHATSAPP_WEBHOOK_VERIFY_TOKEN");
    if (mode === "subscribe" && token === verifyToken) {
      res.status(200).send(challenge);
      return;
    }
    res.status(403).send("Forbidden");
    return;
  }

  if (req.method === "POST") {
    // Record event
    const eventId = crypto.randomUUID();
    await db.collection("whatsappEvents").doc(`wh_${eventId}`).set({
      receivedAt: admin.firestore.FieldValue.serverTimestamp(),
      body: req.body,
    });
    res.status(200).json({ status: "ok" });
    return;
  }

  res.status(405).send("Method Not Allowed");
});
