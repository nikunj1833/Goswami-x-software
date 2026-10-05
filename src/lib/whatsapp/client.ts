import crypto from "crypto";
import { getWhatsAppConfig } from "@/lib/env";

export interface WhatsAppMessageResult {
  success: boolean;
  messageId?: string;
  error?: string;
  details?: unknown;
}

/**
 * Format E.164 phone number (+919876543210) for Meta API (919876543210)
 */
function formatForMeta(e164: string): string {
  return e164.replace(/^\+/, "");
}


/**
 * Send an admin notification alert via WhatsApp (e.g. for new contact submission)
 */
export async function sendWhatsAppAdminAlert(
  adminPhoneNumberE164: string,
  alertText: string
): Promise<WhatsAppMessageResult> {
  const config = getWhatsAppConfig();

  if (!config.phoneNumberId || !config.accessToken || !adminPhoneNumberE164) {
    return { success: false, error: "WhatsApp credentials or admin number not set." };
  }

  const recipient = formatForMeta(adminPhoneNumberE164);
  const url = `https://graph.facebook.com/v21.0/${config.phoneNumberId}/messages`;

  const payload = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: recipient,
    type: "text",
    text: {
      preview_url: false,
      body: alertText,
    },
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return {
      success: response.ok,
      messageId: data?.messages?.[0]?.id,
    };
  } catch {
    return { success: false, error: "Failed to send WhatsApp alert." };
  }
}

/**
 * Verify Meta Webhook SHA256 signature using timing-safe comparison.
 * Meta header format: 'sha256=<signature_hex>'
 */
export function verifyMetaWebhookSignature(
  rawBody: string,
  signatureHeader: string | null | undefined,
  appSecret: string
): boolean {
  if (!signatureHeader || !appSecret) {
    return false;
  }

  const parts = signatureHeader.split("=");
  if (parts.length !== 2 || parts[0] !== "sha256") {
    return false;
  }

  const signatureHex = parts[1];

  try {
    const expectedSignature = crypto
      .createHmac("sha256", appSecret)
      .update(rawBody, "utf8")
      .digest("hex");

    const expectedBuffer = Buffer.from(expectedSignature, "hex");
    const actualBuffer = Buffer.from(signatureHex, "hex");

    if (expectedBuffer.length !== actualBuffer.length) {
      return false;
    }

    return crypto.timingSafeEqual(expectedBuffer, actualBuffer);
  } catch (err) {
    console.error("[Webhook Signature Verification Error]", err);
    return false;
  }
}
