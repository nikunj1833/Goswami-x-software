import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getFirebaseClientConfig } from "@/lib/env";

let firebaseApp: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let googleProvider: GoogleAuthProvider | null = null;

const clientConfig = getFirebaseClientConfig();

if (clientConfig) {
  if (!getApps().length) {
    firebaseApp = initializeApp(clientConfig);
  } else {
    firebaseApp = getApp();
  }
  auth = getAuth(firebaseApp);
  db = getFirestore(firebaseApp);
  googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: "select_account",
  });
} else {
  if (typeof window !== "undefined") {
    console.warn(
      "[Firebase Client] Firebase configuration is missing. Please set NEXT_PUBLIC_FIREBASE_API_KEY and NEXT_PUBLIC_FIREBASE_PROJECT_ID."
    );
  }
}

export function getClientAuth(): Auth | null {
  return auth;
}

export function getClientDb(): Firestore | null {
  return db;
}

export function getGoogleProvider(): GoogleAuthProvider {
  if (!googleProvider) {
    googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({
      prompt: "select_account",
    });
  }
  return googleProvider;
}

export { firebaseApp, auth, db, googleProvider };
