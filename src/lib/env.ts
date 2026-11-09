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
    "";

  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (privateKey) {
    // Strip wrapping quotes if user pasted with quotes
    if (
      (privateKey.startsWith('"') && privateKey.endsWith('"')) ||
      (privateKey.startsWith("'") && privateKey.endsWith("'"))
    ) {
      privateKey = privateKey.slice(1, -1);
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
