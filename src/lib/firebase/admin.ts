import { getApps, initializeApp, cert, type App } from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";
import { getFirestore, type Firestore, FieldValue, Timestamp } from "firebase-admin/firestore";
import { getFirebaseServerConfig } from "@/lib/env";

let adminApp: App | null = null;
let adminAuth: Auth | null = null;
let adminDb: Firestore | null = null;

export function hasFirebaseServerCredentials(): boolean {
  const config = getFirebaseServerConfig();
  return Boolean(
    (config.clientEmail && config.privateKey) ||
    process.env.GOOGLE_APPLICATION_CREDENTIALS ||
    process.env.K_SERVICE
  );
}

export function getAdminApp(): { app: App; auth: Auth; db: Firestore } {
  if (adminApp && adminAuth && adminDb) {
    return { app: adminApp, auth: adminAuth, db: adminDb };
  }

  const existingApps = getApps();
  if (existingApps.length > 0) {
    adminApp = existingApps[0];
  } else {
    const config = getFirebaseServerConfig();
    const projectId =
      config.projectId ||
      process.env.FIREBASE_PROJECT_ID ||
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
      "goswami-x-software";

    if (config.clientEmail && config.privateKey) {
      adminApp = initializeApp({
        credential: cert({
          projectId,
          clientEmail: config.clientEmail,
          privateKey: config.privateKey,
        }),
        projectId,
      });
    } else {
      // Fallback to project ID / default application credentials (GCP / Firebase environment)
      adminApp = initializeApp({
        projectId,
      });
    }
  }

  adminAuth = getAuth(adminApp);
  adminDb = getFirestore(adminApp);

  return { app: adminApp, auth: adminAuth, db: adminDb };
}

export { FieldValue, Timestamp };
