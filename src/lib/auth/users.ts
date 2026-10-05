import { getAdminApp } from "@/lib/firebase/admin";

export interface UserProfile {
  id: string;
  uid: string;
  displayName: string;
  email?: string | null;
  photoURL?: string | null;
  phoneNumber?: string | null;
  role: "user" | "admin";
  status: "active" | "suspended";
  authProvider: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthenticateServerResult {
  uid: string;
  role: string;
  profile: UserProfile;
}

/**
 * Extracts a Bearer token or session/token cookie from incoming HTTP request.
 */
export function extractTokenFromRequest(request: Request): string | null {
  // 1. Check Authorization header: 'Bearer <token>'
  const authHeader = request.headers.get("authorization") || request.headers.get("Authorization");
  if (authHeader && authHeader.toLowerCase().startsWith("bearer ")) {
    const token = authHeader.substring(7).trim();
    if (token) return token;
  }

  // 2. Check Cookie header: 'token=...' or 'session=...'
  const cookieHeader = request.headers.get("cookie");
  if (cookieHeader) {
    const cookies = cookieHeader.split(";").map((c) => c.trim());
    for (const cookie of cookies) {
      if (cookie.startsWith("token=")) {
        const token = cookie.substring("token=".length).trim();
        if (token) return decodeURIComponent(token);
      }
      if (cookie.startsWith("session=")) {
        const token = cookie.substring("session=".length).trim();
        if (token) return decodeURIComponent(token);
      }
    }
  }

  return null;
}

/**
 * Securely verifies a Firebase ID token and synchronizes/retrieves the canonical
 * user profile in Firestore under `users/{firebaseUid}`.
 * Never trusts client-supplied user parameters.
 */
export async function authenticateServerRequest(
  request: Request
): Promise<AuthenticateServerResult | null> {
  const token = extractTokenFromRequest(request);
  if (!token) {
    return null;
  }

  try {
    const { auth: adminAuth, db: adminDb } = getAdminApp();
    const decodedToken = await adminAuth.verifyIdToken(token);

    if (!decodedToken || !decodedToken.uid) {
      return null;
    }

    const uid = decodedToken.uid;
    const email = decodedToken.email || null;
    const displayName =
      decodedToken.name ||
      (email ? email.split("@")[0] : "User");
    const photoURL = decodedToken.picture || null;
    const now = new Date().toISOString();

    let profile: UserProfile = {
      id: uid,
      uid,
      displayName,
      email,
      photoURL,
      phoneNumber: decodedToken.phone_number || null,
      role: "user",
      status: "active",
      authProvider: "google",
      createdAt: now,
      updatedAt: now,
    };

    // Check if Firebase service account or GCP environment credentials are configured
    const hasServerCredentials = Boolean(
      (process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) ||
      process.env.GOOGLE_APPLICATION_CREDENTIALS ||
      process.env.K_SERVICE
    );

    if (hasServerCredentials) {
      try {
        const userRef = adminDb.collection("users").doc(uid);
        const docSnap = await Promise.race([
          userRef.get(),
          new Promise<null>((_, reject) =>
            setTimeout(() => reject(new Error("Firestore operation timed out")), 3000)
          ),
        ]);

        if (docSnap && !docSnap.exists) {
          // First login: create canonical user document
          await userRef.set(profile);
        } else if (docSnap && docSnap.exists) {
          // Returning user: update profile fields, preserve createdAt and role
          const existingData = docSnap.data();
          profile = {
            id: uid,
            uid,
            displayName: displayName || existingData?.displayName || "User",
            email: email || existingData?.email || null,
            photoURL: photoURL || existingData?.photoURL || null,
            phoneNumber: existingData?.phoneNumber || decodedToken.phone_number || null,
            role: (existingData?.role as "user" | "admin") || "user",
            status: (existingData?.status as "active" | "suspended") || "active",
            authProvider: "google",
            createdAt: existingData?.createdAt || now,
            updatedAt: now,
          };

          await userRef.update({
            displayName: profile.displayName,
            email: profile.email,
            photoURL: profile.photoURL,
            updatedAt: now,
          });
        }
      } catch (dbErr) {
        console.warn("[Auth Users] Firestore sync skipped or timed out:", dbErr instanceof Error ? dbErr.message : dbErr);
      }
    }

    return {
      uid,
      role: profile.role,
      profile,
    };
  } catch (err) {
    console.warn("[Auth Token Verification Failed]", err instanceof Error ? err.message : err);
    return null;
  }
}
