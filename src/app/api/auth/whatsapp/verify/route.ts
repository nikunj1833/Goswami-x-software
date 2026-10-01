import { NextResponse } from "next/server";
import { verifyAuthSchema } from "@/lib/validations/auth";
import { verifyAuthChallenge } from "@/lib/auth/challenge";
import { getOrCreateWhatsAppUser } from "@/lib/auth/users";
import { checkRateLimit } from "@/lib/security/rateLimit";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parseResult = verifyAuthSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: parseResult.error.issues[0]?.message || "Invalid verification parameters.",
        },
        { status: 400 }
      );
    }

    const { challengeId, code } = parseResult.data;

    // Rate limit: max 5 verification attempts per challenge session
    const rateLimit = await checkRateLimit(`auth_verify:${challengeId}`, 5, 600);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many verification attempts for this session. Please request a new code.",
        },
        { status: 429 }
      );
    }

    // Verify challenge against stored hash and expiration
    const verifyResult = await verifyAuthChallenge(challengeId, code);

    if (!verifyResult.success || !verifyResult.phoneNumberNormalized) {
      return NextResponse.json(
        {
          success: false,
          error: verifyResult.error || "Incorrect verification code.",
          remainingAttempts: verifyResult.remainingAttempts,
        },
        { status: 400 }
      );
    }

    // Find or create Firebase Auth user and Firestore user profile
    const { customToken, uid, isNewUser, profile } = await getOrCreateWhatsAppUser(
      verifyResult.phoneNumberNormalized,
      verifyResult.displayName
    );

    return NextResponse.json({
      success: true,
      customToken,
      uid,
      isNewUser,
      user: {
        uid: profile.uid,
        phoneNumber: profile.phoneNumber,
        displayName: profile.displayName,
        role: profile.role,
        status: profile.status,
        authProvider: profile.authProvider,
      },
    });
  } catch (err) {
    console.error("[WhatsApp Auth Verify Error]", err);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred while verifying the code.",
      },
      { status: 500 }
    );
  }
}
