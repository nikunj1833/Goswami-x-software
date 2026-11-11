import { getEmailConfig } from "@/lib/env";

export interface InquiryEmailPayload {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string | null;
  message: string;
  createdAtIso: string;
}

export interface EmailNotificationResult {
  success: boolean;
  status: "api_accepted" | "failed" | "unconfigured";
  attemptedAt: string;
  sentAt?: string | null;
  messageId?: string | null;
  errorCode?: string | null;
  error?: string;
}

/**
 * Escapes user input to prevent HTML injection inside email templates.
 */
function escapeHtml(text: string): string {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Generates an executive, branded HTML template for contact inquiry notifications.
 */
export function buildInquiryEmailHtml(inquiry: InquiryEmailPayload): string {
  const safeName = escapeHtml(inquiry.name);
  const safeEmail = escapeHtml(inquiry.email);
  const safePhone = inquiry.phoneNumber ? escapeHtml(inquiry.phoneNumber) : "Not provided";
  const safeMessage = escapeHtml(inquiry.message).replace(/\n/g, "<br />");
  const safeId = escapeHtml(inquiry.id);
  const safeDate = escapeHtml(inquiry.createdAtIso);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>New Contact Inquiry — RN Developer</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0f19; color: #f3f4f6; margin: 0; padding: 24px; line-height: 1.6; }
    .container { max-width: 600px; margin: 0 auto; background-color: #111827; border: 1px solid #1f2937; border-radius: 12px; overflow: hidden; }
    .header { background: linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%); padding: 28px 32px; border-bottom: 1px solid #374151; }
    .badge { display: inline-block; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; background-color: #4f46e5; color: #ffffff; border-radius: 9999px; margin-bottom: 12px; }
    .title { margin: 0; font-size: 20px; font-weight: 700; color: #ffffff; }
    .content { padding: 32px; }
    .field-group { margin-bottom: 20px; }
    .label { font-size: 11px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.05em; color: #9ca3af; margin-bottom: 4px; }
    .value { font-size: 15px; color: #f9fafb; font-weight: 500; }
    .value a { color: #818cf8; text-decoration: none; }
    .message-box { background-color: #030712; border: 1px solid #1f2937; border-radius: 8px; padding: 18px; color: #e5e7eb; font-size: 14px; white-space: normal; line-height: 1.7; margin-top: 6px; }
    .footer { padding: 20px 32px; background-color: #0b0f19; border-top: 1px solid #1f2937; font-size: 12px; color: #6b7280; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <span class="badge">New Project Inquiry</span>
      <h1 class="title">RN Developer Contact Submission</h1>
    </div>
    <div class="content">
      <div class="field-group">
        <div class="label">Client Name</div>
        <div class="value">${safeName}</div>
      </div>
      <div class="field-group">
        <div class="label">Email Address</div>
        <div class="value"><a href="mailto:${safeEmail}">${safeEmail}</a></div>
      </div>
      <div class="field-group">
        <div class="label">Phone / WhatsApp</div>
        <div class="value">${safePhone}</div>
      </div>
      <div class="field-group">
        <div class="label">Inquiry Message</div>
        <div class="message-box">${safeMessage}</div>
      </div>
      <div class="field-group" style="margin-bottom: 0;">
        <div class="label">Reference ID & Timestamp</div>
        <div class="value" style="font-size: 12px; font-family: monospace; color: #9ca3af;">
          ID: ${safeId}<br>
          Received: ${safeDate}<br>
          Source: https://www.rndeveloper.in
        </div>
      </div>
    </div>
    <div class="footer">
      Sent automatically by RN Developer Website API • <a href="https://www.rndeveloper.in" style="color: #6366f1;">rndeveloper.in</a>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Sends a real-time email notification via Resend HTTP API.
 * Never throws unhandled exceptions; returns structured status.
 */
export async function sendInquiryEmailNotification(
  inquiry: InquiryEmailPayload
): Promise<EmailNotificationResult> {
  const attemptedAt = new Date().toISOString();
  const config = getEmailConfig();

  if (!config.resendApiKey || !config.notificationEmail) {
    return {
      success: false,
      status: "unconfigured",
      attemptedAt,
      error: "Missing RESEND_API_KEY or CONTACT_NOTIFICATION_EMAIL environment configuration.",
    };
  }

  const html = buildInquiryEmailHtml(inquiry);
  const subject = `New Contact Inquiry — RN Developer (${inquiry.name})`;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: config.emailFrom,
        to: [config.notificationEmail],
        reply_to: inquiry.email,
        subject,
        html,
        headers: {
          "X-Entity-Ref-ID": inquiry.id,
        },
      }),
      signal: AbortSignal.timeout(8000),
    });

    const data = await response.json().catch(() => null);

    if (response.ok && data?.id) {
      return {
        success: true,
        status: "api_accepted",
        attemptedAt,
        sentAt: new Date().toISOString(),
        messageId: data.id,
      };
    }

    const errorCode = data?.name || data?.error?.name || `HTTP_${response.status}`;
    const errorMessage =
      data?.message || data?.error?.message || `Resend API HTTP ${response.status}`;

    return {
      success: false,
      status: "failed",
      attemptedAt,
      errorCode,
      error: errorMessage,
    };
  } catch (err) {
    const isTimeout = err instanceof Error && err.name === "TimeoutError";
    return {
      success: false,
      status: "failed",
      attemptedAt,
      errorCode: isTimeout ? "TIMEOUT" : "NETWORK_ERROR",
      error: err instanceof Error ? err.message : "Failed to connect to Resend API.",
    };
  }
}

