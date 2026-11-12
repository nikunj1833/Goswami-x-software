/**
 * Environment configuration helper.
 * Strictly separates client-safe configuration from server-only secrets.
 */

export interface FirebaseClientConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

export function getFirebaseClientConfig(): FirebaseClientConfig | null {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const authDomain =
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    (projectId ? `${projectId}.firebaseapp.com` : "");
  const storageBucket =
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    (projectId ? `${projectId}.firebasestorage.app` : "");
  const messagingSenderId =
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "";
  const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "";

  if (!apiKey || !projectId) {
    return null;
  }

  return {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
  };
}

export interface FirebaseServerConfig {
  projectId: string;
  clientEmail?: string;
  privateKey?: string;
}

export function getFirebaseServerConfig(): FirebaseServerConfig {
  const projectId =
    process.env.FIREBASE_PROJECT_ID ||
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
    "goswami-x-software";

  let clientEmail = (
    process.env.FIREBASE_CLIENT_EMAIL ||
    process.env.FIREBASE_SERVICE_ACCOUNT_EMAIL ||
    process.env.GOOGLE_CLIENT_EMAIL
  )?.trim();

  if (clientEmail) {
    if (
      (clientEmail.startsWith('"') && clientEmail.endsWith('"')) ||
      (clientEmail.startsWith("'") && clientEmail.endsWith("'"))
    ) {
      clientEmail = clientEmail.slice(1, -1).trim();
    }
  }

  let privateKey = (
    process.env.FIREBASE_PRIVATE_KEY ||
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY ||
    process.env.GOOGLE_PRIVATE_KEY
  )?.trim();

  if (privateKey) {
    // If the entire service account JSON was accidentally pasted into the private key field:
    if (privateKey.startsWith("{") && privateKey.endsWith("}")) {
      try {
        const parsed = JSON.parse(privateKey);
        if (parsed.private_key) privateKey = String(parsed.private_key).trim();
        if (parsed.client_email && !clientEmail) clientEmail = String(parsed.client_email).trim();
      } catch {
        // Not valid JSON, proceed with normal string handling
      }
    }

    // Strip wrapping quotes if user pasted with quotes
    if (
      (privateKey.startsWith('"') && privateKey.endsWith('"')) ||
      (privateKey.startsWith("'") && privateKey.endsWith("'"))
    ) {
      privateKey = privateKey.slice(1, -1).trim();
    }

    // Handle base64 encoded private key if provided that way in CI
    if (!privateKey.includes("BEGIN PRIVATE KEY") && privateKey.includes("LS0tLS1CRUdJTi")) {
      try {
        const decoded = Buffer.from(privateKey, "base64").toString("utf8");
        if (decoded.includes("BEGIN PRIVATE KEY")) {
          privateKey = decoded;
        }
      } catch {
        // Keep original
      }
    }

    // Replace escaped newlines if passed in single-line env string
    privateKey = privateKey.replace(/\\n/g, "\n");
  }

  return {
    projectId,
    clientEmail,
    privateKey,
  };
}

export interface EmailConfig {
  resendApiKey: string;
  notificationEmail: string;
  emailFrom: string;
}

export function getEmailConfig(): EmailConfig {
  return {
    resendApiKey: process.env.RESEND_API_KEY || "",
    notificationEmail: process.env.CONTACT_NOTIFICATION_EMAIL || "",
    emailFrom: process.env.EMAIL_FROM || "RN Developer <onboarding@resend.dev>",
  };
}

export interface WhatsAppNotificationConfig {
  phoneNumberId: string;
  accessToken: string;
  notificationTo: string;
  templateName: string;
  templateLanguage: string;
  graphApiVersion: string;
}

export function getWhatsAppNotificationConfig(): WhatsAppNotificationConfig {
  return {
    phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID || "",
    accessToken: process.env.WHATSAPP_ACCESS_TOKEN || "",
    notificationTo:
      process.env.WHATSAPP_NOTIFICATION_TO ||
      process.env.ADMIN_NOTIFICATION_PHONE_NUMBER ||
      "",
    templateName: process.env.WHATSAPP_TEMPLATE_NAME || "",
    templateLanguage: process.env.WHATSAPP_TEMPLATE_LANGUAGE || "en_US",
    graphApiVersion: process.env.WHATSAPP_GRAPH_API_VERSION || "v21.0",
  };
}

export interface WhatsAppConfig {
  phoneNumberId: string;
  accessToken: string;
  businessAccountId?: string;
  webhookVerifyToken: string;
  appSecret: string;
  templateName?: string;
  templateHasButton?: boolean;
  officialNumber: string;
}

export function getWhatsAppConfig(): WhatsAppConfig {
  return {
    phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID || "",
    accessToken: process.env.WHATSAPP_ACCESS_TOKEN || "",
    businessAccountId: process.env.WHATSAPP_BUSINESS_ACCOUNT_ID,
    webhookVerifyToken: process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN || "",
    appSecret: process.env.WHATSAPP_APP_SECRET || "",
    templateName: process.env.WHATSAPP_TEMPLATE_NAME || undefined,
    templateHasButton: process.env.WHATSAPP_TEMPLATE_HAS_BUTTON === "true",
    officialNumber: process.env.WHATSAPP_OFFICIAL_NUMBER || "910000000000",
  };
}

export function getAuthHmacSecret(): string {
  const secret = process.env.AUTH_CHALLENGE_HMAC_SECRET;
  if (!secret) {
    throw new Error("AUTH_CHALLENGE_HMAC_SECRET environment variable is required.");
  }
  return secret;
}
