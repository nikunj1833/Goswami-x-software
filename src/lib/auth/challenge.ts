import crypto from "crypto";
import { getAdminApp, FieldValue, Timestamp } from "@/lib/firebase/admin";
import { getAuthHmacSecret } from "@/lib/env";

export interface AuthChallengeRecord {
  challengeId: string;
  phoneNumberNormalized: string;
  displayName?: string;
  hashedCode: string;
  attempts: number;
  maxAttempts: number;
  expiresAt: FirebaseFirestore.Timestamp;
  createdAt: FirebaseFirestore.FieldValue;
  used: boolean;
  usedAt?: FirebaseFirestore.FieldValue;
}

export function generateOtpCode(): string {
  // 6-digit cryptographically secure random integer
  return crypto.randomInt(100000, 1000000).toString();
}

export function hashOtp(code: string, phoneNumberE164: string): string {
  const secret = getAuthHmacSecret();
  return crypto
    .createHmac("sha256", secret)
    .update(`${phoneNumberE164}:${code}`)
    .digest("hex");
}

export async function createAuthChallenge(
  phoneNumberNormalized: string,
  displayName?: string
): Promise<{ challengeId: string; code: string; expiresAt: Date }> {
  const { db } = getAdminApp();
  const challengeId = crypto.randomUUID();
  const code = generateOtpCode();
  const hashedCode = hashOtp(code, phoneNumberNormalized);

  const ttlMs = 10 * 60 * 1000; // 10 minutes
  const expiresAtDate = new Date(Date.now() + ttlMs);
  const expiresAtTimestamp = Timestamp.fromDate(expiresAtDate);

  const challengeData: AuthChallengeRecord = {
    challengeId,
    phoneNumberNormalized,
    displayName: displayName?.trim() || undefined,
    hashedCode,
    attempts: 0,
    maxAttempts: 5,
    expiresAt: expiresAtTimestamp,
    createdAt: FieldValue.serverTimestamp(),
    used: false,
  };

  await db.collection("authChallenges").doc(challengeId).set(challengeData);

  return {
    challengeId,
    code,
    expiresAt: expiresAtDate,
  };
}

export interface VerifyChallengeResult {
  success: boolean;
  phoneNumberNormalized?: string;
  displayName?: string;
  error?: string;
  remainingAttempts?: number;
}

export async function verifyAuthChallenge(
  challengeId: string,
  submittedCode: string
): Promise<VerifyChallengeResult> {
  const { db } = getAdminApp();
  const challengeRef = db.collection("authChallenges").doc(challengeId);

  return await db.runTransaction(async (transaction) => {
    const doc = await transaction.get(challengeRef);

    if (!doc.exists) {
      return {
        success: false,
        error: "Verification session not found or expired. Please request a new code.",
      };
    }

    const data = doc.data() as AuthChallengeRecord;

    if (data.used) {
      return {
        success: false,
        error: "This verification code has already been used. Please request a new code.",
      };
    }

    if (data.attempts >= data.maxAttempts) {
      return {
        success: false,
        error: "Too many incorrect attempts. Please request a new code.",
        remainingAttempts: 0,
      };
    }

    const now = Date.now();
    const expiresAtMs = data.expiresAt.toMillis();
    if (now > expiresAtMs) {
      return {
        success: false,
        error: "Verification code has expired. Please request a new code.",
      };
    }

    const expectedHash = hashOtp(submittedCode.trim(), data.phoneNumberNormalized);
    const expectedBuffer = Buffer.from(expectedHash, "hex");
    const actualBuffer = Buffer.from(data.hashedCode, "hex");

    const isMatch =
      expectedBuffer.length === actualBuffer.length &&
      crypto.timingSafeEqual(expectedBuffer, actualBuffer);

    if (!isMatch) {
      const nextAttempts = data.attempts + 1;
      const remaining = Math.max(0, data.maxAttempts - nextAttempts);

      transaction.update(challengeRef, {
        attempts: nextAttempts,
      });

      return {
        success: false,
        error: `Incorrect verification code. ${remaining} attempt${remaining === 1 ? "" : "s"} remaining.`,
        remainingAttempts: remaining,
      };
    }

    // Success: mark used
    transaction.update(challengeRef, {
      used: true,
      usedAt: FieldValue.serverTimestamp(),
    });

    return {
      success: true,
      phoneNumberNormalized: data.phoneNumberNormalized,
      displayName: data.displayName,
    };
  });
}
