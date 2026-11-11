import { getApps, initializeApp, cert, type App } from "firebase-admin/app";
import { getFirestore, type Firestore, FieldValue, Timestamp } from "firebase-admin/firestore";
import type { Auth } from "firebase-admin/auth";
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

function getAdminAuth(app: App): Auth {
  if (!adminAuth) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { getAuth } = require("firebase-admin/auth");
    adminAuth = getAuth(app);
  }
  return adminAuth!;
}

export function getAdminApp(): { app: App; auth: Auth; db: Firestore } {
  if (adminApp && adminDb) {
    return {
      app: adminApp,
      get auth() {
        return getAdminAuth(adminApp!);
      },
      db: adminDb,
    };
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

  adminDb = getFirestore(adminApp);

  return {
    app: adminApp,
    get auth() {
      return getAdminAuth(adminApp!);
    },
    db: adminDb,
  };
}

export { FieldValue, Timestamp };
