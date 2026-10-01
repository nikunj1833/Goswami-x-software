import { NextResponse } from "next/server";
import { getWhatsAppConfig } from "@/lib/env";
import { verifyMetaWebhookSignature } from "@/lib/whatsapp/client";
import { whatsAppWebhookPayloadSchema } from "@/lib/validations/webhook";
import { getAdminApp, FieldValue } from "@/lib/firebase/admin";

export const dynamic = "force-dynamic";

/**
 * Meta Webhook Verification Handler (GET)
 * Meta documentation: https://developers.facebook.com/docs/graph-api/webhooks/getting-started
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  const config = getWhatsAppConfig();

  if (mode === "subscribe" && token && token === config.webhookVerifyToken) {
    console.log("[WhatsApp Webhook] Verification successful.");
    return new Response(challenge, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }

  console.warn("[WhatsApp Webhook] Verification token mismatch or invalid mode.");
  return new Response("Forbidden", { status: 403 });
}

/**
 * Meta Webhook Event Handler (POST)
 * Verifies HMAC-SHA256 signature and processes webhook notifications idempotently.
 */
export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signatureHeader = request.headers.get("x-hub-signature-256");

    const config = getWhatsAppConfig();

    // Verify signature if secret is configured
    if (config.appSecret) {
      const isValid = verifyMetaWebhookSignature(rawBody, signatureHeader, config.appSecret);
      if (!isValid) {
        console.error("[WhatsApp Webhook] Invalid signature rejected.");
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
      }
    } else {
      console.warn("[WhatsApp Webhook] WHATSAPP_APP_SECRET not set; skipping signature verification in dev.");
    }

    let payloadJson: unknown;
    try {
      payloadJson = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: "Malformed JSON payload" }, { status: 400 });
    }

    const parseResult = whatsAppWebhookPayloadSchema.safeParse(payloadJson);
    if (!parseResult.success) {
      // Return 200 to Meta so it does not endlessly retry non-relevant events
      return NextResponse.json({ status: "ignored_unrecognized_schema" }, { status: 200 });
    }

    const { db } = getAdminApp();
    const payload = parseResult.data;

    // Idempotent processing of entries
    for (const entry of payload.entry) {
      for (const change of entry.changes) {
        const val = change.value;

        // Process message statuses (sent, delivered, read, failed)
        if (val.statuses && val.statuses.length > 0) {
          for (const statusObj of val.statuses) {
            const statusId = statusObj.id;
            if (!statusId) continue;

            const eventRef = db.collection("whatsappEvents").doc(`status_${statusId}_${statusObj.status}`);
            const eventDoc = await eventRef.get();

            if (!eventDoc.exists) {
              await eventRef.set({
                eventId: statusId,
                type: "status_update",
                status: statusObj.status || "unknown",
                recipientId: statusObj.recipient_id || null,
                timestamp: statusObj.timestamp || null,
                receivedAt: FieldValue.serverTimestamp(),
              });
            }
          }
        }

        // Process incoming user messages
        if (val.messages && val.messages.length > 0) {
          for (const message of val.messages) {
            const messageId = message.id;
            if (!messageId) continue;

            const eventRef = db.collection("whatsappEvents").doc(`msg_${messageId}`);
            const eventDoc = await eventRef.get();

            if (!eventDoc.exists) {
              await eventRef.set({
                eventId: messageId,
                type: "incoming_message",
                from: message.from || "unknown",
                messageType: message.type || "unknown",
                textSnippet: message.text?.body ? message.text.body.slice(0, 100) : null,
                timestamp: message.timestamp || null,
                receivedAt: FieldValue.serverTimestamp(),
              });
            }
          }
        }
      }
    }

    return NextResponse.json({ status: "ok" }, { status: 200 });
  } catch (err) {
    console.error("[WhatsApp Webhook POST Error]", err);
    // Always return 200 to Meta on unexpected exceptions to avoid webhook disablement
    return NextResponse.json({ status: "acknowledged_with_error" }, { status: 200 });
  }
}
