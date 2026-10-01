import { NextResponse } from "next/server";
import { startAuthSchema } from "@/lib/validations/auth";
import { normalizePhoneNumber } from "@/lib/phone";
import { createAuthChallenge } from "@/lib/auth/challenge";
import { sendWhatsAppVerificationCode } from "@/lib/whatsapp/client";
import { checkRateLimit, getClientIp } from "@/lib/security/rateLimit";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parseResult = startAuthSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: parseResult.error.issues[0]?.message || "Invalid input data.",
        },
        { status: 400 }
      );
    }

    const { phoneNumber, displayName } = parseResult.data;

    // Normalize phone number to E.164
    const phoneResult = normalizePhoneNumber(phoneNumber);
    if (!phoneResult.isValid) {
      return NextResponse.json(
        {
          success: false,
          error: phoneResult.error || "Please enter a valid phone number with country code.",
        },
        { status: 400 }
      );
    }

    const clientIp = getClientIp(request);

    // Rate limit: max 3 requests per 10 minutes per phone number
    const phoneRateLimit = await checkRateLimit(
      `auth_start_phone:${phoneResult.e164}`,
      3,
      600
    );
    if (!phoneRateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many requests for this phone number. Please try again in ${Math.ceil(
            phoneRateLimit.resetInSeconds / 60
          )} minute(s).`,
        },
        { status: 429 }
      );
    }

    // Rate limit: max 10 requests per 10 minutes per IP
    const ipRateLimit = await checkRateLimit(`auth_start_ip:${clientIp}`, 10, 600);
    if (!ipRateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many attempts from your IP. Please try again later.",
        },
        { status: 429 }
      );
    }

    // Create cryptographically secure challenge in Firestore
    const { challengeId, code, expiresAt } = await createAuthChallenge(
      phoneResult.e164,
      displayName
    );

    // Dispatch verification code via official Meta WhatsApp Cloud API
    const sendResult = await sendWhatsAppVerificationCode(phoneResult.e164, code);

    if (!sendResult.success) {
      // In development or if Meta credentials are not yet configured in env,
      // return a safe informative message so the client knows what occurred.
      return NextResponse.json(
        {
          success: false,
          error:
            sendResult.error ||
            "Unable to deliver WhatsApp verification message. Please check the phone number or try again later.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      challengeId,
      expiresAt: expiresAt.toISOString(),
      message: `A 6-digit verification code has been sent to your WhatsApp number ${phoneResult.formattedInternational}.`,
    });
  } catch (err) {
    console.error("[WhatsApp Auth Start Error]", err);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred while starting authentication.",
      },
      { status: 500 }
    );
  }
}
