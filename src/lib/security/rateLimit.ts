import { getAdminApp, Timestamp } from "@/lib/firebase/admin";

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetInSeconds: number;
}

// In-memory fallback if Firestore is unreachable
const memoryFallback = new Map<string, { count: number; resetAt: number }>();

/**
 * Serverless-compatible rate limiter persisted in Firestore collection 'rateLimits'.
 */
export async function checkRateLimit(
  key: string,
  limit: number,
  windowSeconds: number
): Promise<RateLimitResult> {
  const now = Date.now();
  const windowMs = windowSeconds * 1000;

  // Check if Firebase service account or GCP environment credentials are configured
  const hasServerCredentials = Boolean(
    (process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) ||
    process.env.GOOGLE_APPLICATION_CREDENTIALS ||
    process.env.K_SERVICE
  );

  if (!hasServerCredentials) {
    const entry = memoryFallback.get(key);
    if (!entry || now > entry.resetAt) {
      memoryFallback.set(key, { count: 1, resetAt: now + windowMs });
      return { allowed: true, limit, remaining: limit - 1, resetInSeconds: windowSeconds };
    }

    const resetInSeconds = Math.max(1, Math.ceil((entry.resetAt - now) / 1000));
    if (entry.count >= limit) {
      return { allowed: false, limit, remaining: 0, resetInSeconds };
    }

    entry.count += 1;
    return { allowed: true, limit, remaining: limit - entry.count, resetInSeconds };
  }

  try {
    const { db } = getAdminApp();
    const rateLimitRef = db.collection("rateLimits").doc(key);

    return await db.runTransaction(async (transaction) => {
      const doc = await transaction.get(rateLimitRef);

      if (!doc.exists) {
        const resetAt = now + windowMs;
        transaction.set(rateLimitRef, {
          count: 1,
          resetAt: Timestamp.fromMillis(resetAt),
        });
        return {
          allowed: true,
          limit,
          remaining: limit - 1,
          resetInSeconds: windowSeconds,
        };
      }

      const data = doc.data() as { count: number; resetAt: FirebaseFirestore.Timestamp };
      const resetAtMs = data.resetAt ? data.resetAt.toMillis() : now;

      if (now > resetAtMs) {
        // Window expired, start fresh
        const newResetAt = now + windowMs;
        transaction.set(rateLimitRef, {
          count: 1,
          resetAt: Timestamp.fromMillis(newResetAt),
        });
        return {
          allowed: true,
          limit,
          remaining: limit - 1,
          resetInSeconds: windowSeconds,
        };
      }

      const currentCount = data.count || 0;
      const resetInSeconds = Math.max(1, Math.ceil((resetAtMs - now) / 1000));

      if (currentCount >= limit) {
        return {
          allowed: false,
          limit,
          remaining: 0,
          resetInSeconds,
        };
      }

      transaction.update(rateLimitRef, {
        count: currentCount + 1,
      });

      return {
        allowed: true,
        limit,
        remaining: limit - (currentCount + 1),
        resetInSeconds,
      };
    });
  } catch (err) {
    console.warn("[RateLimit] Firestore rate limit failed, using in-memory fallback:", err);

    // In-memory fallback
    const entry = memoryFallback.get(key);
    if (!entry || now > entry.resetAt) {
      memoryFallback.set(key, { count: 1, resetAt: now + windowMs });
      return { allowed: true, limit, remaining: limit - 1, resetInSeconds: windowSeconds };
    }

    const resetInSeconds = Math.max(1, Math.ceil((entry.resetAt - now) / 1000));
    if (entry.count >= limit) {
      return { allowed: false, limit, remaining: 0, resetInSeconds };
    }

    entry.count += 1;
    return { allowed: true, limit, remaining: limit - entry.count, resetInSeconds };
  }
}

/**
 * Extracts client IP address from Next.js request headers
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  return "127.0.0.1";
}
