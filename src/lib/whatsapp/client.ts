import crypto from "crypto";
import { getWhatsAppNotificationConfig } from "@/lib/env";

export interface WhatsAppNotificationResult {
  success: boolean;
  status: "api_accepted" | "failed" | "unconfigured";
  attemptedAt: string;
  sentAt?: string | null;
  messageId?: string | null;
  errorCode?: string | null;
  error?: string;
}

export interface InquiryWhatsAppPayload {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string | null;
  message: string;
  createdAtIso: string;
}

/**
 * Format E.164 phone number (+919876543210) for Meta API (919876543210)
 */
function formatForMeta(e164: string): string {
  return e164.replace(/^\+/, "").replace(/[\s-]/g, "");
}

/**
 * Sends a real-time WhatsApp inquiry notification to the business owner
 * using EXCLUSIVELY an approved Meta WhatsApp Business Message Template.
 * Does NOT use or fall back to freeform text messages.
 */
export async function sendInquiryWhatsAppTemplateNotification(
  inquiry: InquiryWhatsAppPayload
): Promise<WhatsAppNotificationResult> {
  const attemptedAt = new Date().toISOString();
  const config = getWhatsAppNotificationConfig();

  if (
    !config.phoneNumberId ||
    !config.accessToken ||
    !config.notificationTo ||
    !config.templateName
  ) {
    return {
      success: false,
      status: "unconfigured",
      attemptedAt,
      error:
        "Missing required Meta WhatsApp configuration: WHATSAPP_ACCESS_TOKEN, WHATSAPP_PHONE_NUMBER_ID, WHATSAPP_NOTIFICATION_TO, or WHATSAPP_TEMPLATE_NAME.",
    };
  }

  const recipient = formatForMeta(config.notificationTo);
  if (!/^\d{8,15}$/.test(recipient)) {
    return {
      success: false,
      status: "failed",
      attemptedAt,
      errorCode: "INVALID_DESTINATION_PHONE",
      error: `Invalid destination WhatsApp phone number: "${config.notificationTo}". Expected valid E.164 phone number with 8 to 15 digits.`,
    };
  }

  const graphVersion = config.graphApiVersion || "v21.0";
  const url = `https://graph.facebook.com/${graphVersion}/${config.phoneNumberId}/messages`;

  // Standard 6-parameter Meta approved template body
  // {{1}}: Name, {{2}}: Email, {{3}}: Phone, {{4}}: Message, {{5}}: Submission ID, {{6}}: Timestamp
  const payload = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: recipient,
    type: "template",
    template: {
      name: config.templateName,
      language: {
        code: config.templateLanguage || "en_US",
      },
      components: [
        {
          type: "body",
          parameters: [
            { type: "text", text: inquiry.name.slice(0, 100) },
            { type: "text", text: inquiry.email.slice(0, 100) },
            { type: "text", text: (inquiry.phoneNumber || "Not provided").slice(0, 50) },
            { type: "text", text: inquiry.message.slice(0, 500) },
            { type: "text", text: inquiry.id },
            { type: "text", text: inquiry.createdAtIso },
          ],
        },
      ],
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
      signal: AbortSignal.timeout(8000),
    });

    const data = await response.json().catch(() => null);

    if (response.ok && data?.messages?.[0]?.id) {
      return {
        success: true,
        status: "api_accepted",
        attemptedAt,
        sentAt: new Date().toISOString(),
        messageId: data.messages[0].id,
      };
    }

    const errorCode = data?.error?.code
      ? String(data.error.code)
      : data?.error?.type || `HTTP_${response.status}`;
    const errorMsg =
      data?.error?.message ||
      data?.error?.error_user_msg ||
      `Meta Graph API HTTP ${response.status}`;

    return {
      success: false,
      status: "failed",
      attemptedAt,
      errorCode,
      error: errorMsg,
    };
  } catch (err) {
    const isTimeout = err instanceof Error && err.name === "TimeoutError";
    return {
      success: false,
      status: "failed",
      attemptedAt,
      errorCode: isTimeout ? "TIMEOUT" : "NETWORK_ERROR",
      error: err instanceof Error ? err.message : "Failed to connect to Meta WhatsApp API.",
    };
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
