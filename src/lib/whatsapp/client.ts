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
 * Send an OTP verification code via Meta WhatsApp Cloud API.
 * Uses template if WHATSAPP_TEMPLATE_NAME is configured, otherwise sends official text format.
 */
export async function sendWhatsAppVerificationCode(
  phoneNumberE164: string,
  code: string
): Promise<WhatsAppMessageResult> {
  const config = getWhatsAppConfig();

  if (!config.phoneNumberId || !config.accessToken) {
    console.warn(
      "[WhatsApp API] Missing WHATSAPP_PHONE_NUMBER_ID or WHATSAPP_ACCESS_TOKEN. Check environment variables."
    );
    return {
      success: false,
      error: "WhatsApp service credentials not configured. Please contact the administrator.",
    };
  }

  const recipient = formatForMeta(phoneNumberE164);
  const url = `https://graph.facebook.com/v21.0/${config.phoneNumberId}/messages`;

  let payload: Record<string, unknown>;

  if (config.templateName) {
    // Official Authentication / OTP Template message
    const components: Array<Record<string, unknown>> = [
      {
        type: "body",
        parameters: [
          {
            type: "text",
            text: code,
          },
        ],
      },
    ];

    if (config.templateHasButton) {
      components.push({
        type: "button",
        sub_type: "url",
        index: "0",
        parameters: [
          {
            type: "text",
            text: code,
          },
        ],
      });
    }

    payload = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: recipient,
      type: "template",
      template: {
        name: config.templateName,
        language: { code: "en_US" },
        components,
      },
    };
  } else {
    // Standard direct message
    payload = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: recipient,
      type: "text",
      text: {
        preview_url: false,
        body: `Your Goswami X Software verification code is: *${code}*.\n\nThis code will expire in 10 minutes. For your security, do not share this code with anyone.`,
      },
    };
  }

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

    if (!response.ok) {
      console.error("[WhatsApp API Error]", data);
      const errorMessage = data?.error?.message || "Failed to deliver WhatsApp verification code.";
      return {
        success: false,
        error: errorMessage,
        details: data?.error,
      };
    }

    const messageId = data?.messages?.[0]?.id;
    return {
      success: true,
      messageId,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Network failure communicating with Meta WhatsApp API";
    console.error("[WhatsApp API Network Error]", errorMsg);
    return {
      success: false,
      error: "Failed to communicate with WhatsApp service. Please try again later.",
    };
  }
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
