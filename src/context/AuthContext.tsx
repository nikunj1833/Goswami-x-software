"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User as FirebaseUser,
} from "firebase/auth";
import { auth, getClientAuth, getGoogleProvider } from "@/lib/firebase/client";

export interface UserProfile {
  id: string;
  uid: string;
  email: string;
  displayName: string;
  name: string;
  photoURL?: string | null;
  phoneNumber?: string | null;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  authError: string | null;
  clearAuthError: () => void;
  isAuthOpen: boolean;
  openAuth: (mode?: string) => void;
  closeAuth: () => void;
  signInWithGoogle: () => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  getIdToken: () => Promise<string | null>;
  showLoginToast: boolean;
  toastKey: number;
  dismissLoginToast: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function setTokenCookie(token: string | null) {
  if (typeof document === "undefined") return;
  if (token) {
    document.cookie = `token=${encodeURIComponent(token)}; path=/; SameSite=Lax; max-age=86400`;
  } else {
    document.cookie = "token=; path=/; max-age=0; SameSite=Lax";
    document.cookie = "session=; path=/; max-age=0; SameSite=Lax";
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(() => Boolean(auth || getClientAuth()));
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [showLoginToast, setShowLoginToast] = useState(false);
  const [toastKey, setToastKey] = useState(0);

  const triggerLoginToast = useCallback(() => {
    setShowLoginToast(true);
    setToastKey((prev) => prev + 1);
  }, []);

  const dismissLoginToast = useCallback(() => {
    setShowLoginToast(false);
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production" && typeof window !== "undefined") {
      (window as unknown as Record<string, unknown>).__triggerLoginToast = triggerLoginToast;
      (window as unknown as Record<string, unknown>).__dismissLoginToast = dismissLoginToast;
    }
  }, [triggerLoginToast, dismissLoginToast]);

  const clearAuthError = useCallback(() => setAuthError(null), []);

  const openAuth = useCallback((mode?: string) => {
    void mode;
    setIsAuthOpen(true);
  }, []);

  const closeAuth = useCallback(() => {
    setIsAuthOpen(false);
  }, []);

  const getIdToken = useCallback(async (): Promise<string | null> => {
    const currentAuth = auth || getClientAuth();
    if (!currentAuth?.currentUser) return null;
    try {
      return await currentAuth.currentUser.getIdToken();
    } catch {
      return null;
    }
  }, []);

  // Listen to Firebase client auth state changes
  useEffect(() => {
    const currentAuth = auth || getClientAuth();
    if (!currentAuth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(currentAuth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        try {
          const idToken = await firebaseUser.getIdToken();
          setTokenCookie(idToken);

          const fallbackName =
            firebaseUser.displayName ||
            (firebaseUser.email ? firebaseUser.email.split("@")[0] : "User");

          const clientProfile: UserProfile = {
            id: firebaseUser.uid,
            uid: firebaseUser.uid,
            email: firebaseUser.email || "",
            displayName: fallbackName,
            name: fallbackName,
            photoURL: firebaseUser.photoURL || null,
            phoneNumber: firebaseUser.phoneNumber || null,
            createdAt: firebaseUser.metadata.creationTime,
          };

          setUser(clientProfile);

          // If this session just authenticated via Google (e.g. returning to homepage after redirect/reload)
          if (
            typeof window !== "undefined" &&
            sessionStorage.getItem("login_success_pending") === "true"
          ) {
            sessionStorage.removeItem("login_success_pending");
            triggerLoginToast();
          }

          // Synchronize with server Admin verification & canonical Firestore document
          fetch("/api/auth/me", {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          })
            .then((res) => (res.ok ? res.json() : null))
            .then((data) => {
              if (data?.authenticated && data?.user) {
                setUser((prev) => ({
                  ...(prev || clientProfile),
                  id: data.user.uid,
                  uid: data.user.uid,
                  email: data.user.email || prev?.email || "",
                  displayName: data.user.displayName || prev?.displayName || fallbackName,
                  name: data.user.displayName || prev?.name || fallbackName,
                  photoURL: data.user.photoURL || prev?.photoURL || null,
                  phoneNumber: data.user.phoneNumber || prev?.phoneNumber || null,
                  role: data.user.role,
                  createdAt: data.user.createdAt || prev?.createdAt,
                  updatedAt: data.user.updatedAt,
                }));
              }
            })
            .catch(() => {});
        } catch (err) {
          console.warn("[AuthContext] Error retrieving auth token:", err);
        }
      } else {
        setTokenCookie(null);
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [triggerLoginToast]);

  const signInWithGoogle = useCallback(async (): Promise<{ error?: string }> => {
    const activeAuth = auth || getClientAuth();
    if (!activeAuth) {
      const msg = "Firebase Auth is not configured. Missing NEXT_PUBLIC_FIREBASE_API_KEY and NEXT_PUBLIC_FIREBASE_PROJECT_ID.";
      setAuthError(msg);
      return { error: msg };
    }

    try {
      setAuthError(null);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("login_success_pending", "true");
      }
      const provider = getGoogleProvider();
      const result = await signInWithPopup(activeAuth, provider);
      const idToken = await result.user.getIdToken();
      setTokenCookie(idToken);

      const displayName =
        result.user.displayName ||
        (result.user.email ? result.user.email.split("@")[0] : "User");

      const profile: UserProfile = {
        id: result.user.uid,
        uid: result.user.uid,
        email: result.user.email || "",
        displayName,
        name: displayName,
        photoURL: result.user.photoURL || null,
        phoneNumber: result.user.phoneNumber || null,
        createdAt: result.user.metadata.creationTime,
      };

      setUser(profile);
      setIsAuthOpen(false);
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("login_success_pending");
      }
      triggerLoginToast();

      // Verify token on server and sync/create Firestore user document in background
      fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      })
        .then((res) => (res.ok ? res.json() : null))
        .then((verifyData) => {
          if (verifyData?.authenticated && verifyData?.user) {
            setUser((prev) => ({
              ...(prev || profile),
              ...verifyData.user,
              name: verifyData.user.displayName || profile.name,
            }));
          }
        })
        .catch((syncErr) => {
          console.warn("[AuthContext] Server sync warning after Google login:", syncErr);
        });

      return {};
    } catch (err: unknown) {
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("login_success_pending");
      }
      let message = "Failed to sign in with Google. Please try again.";
      if (err && typeof err === "object") {
        const errorObj = err as Record<string, unknown>;
        if (errorObj.code === "auth/popup-closed-by-user") {
          return { error: "Google sign-in popup was closed." };
        }
        if (errorObj.code === "auth/popup-blocked") {
          message = "Sign-in popup was blocked by browser. Please allow popups for this site.";
        } else if (errorObj.code === "auth/unauthorized-domain") {
          message = "This domain is not authorized for Google Sign-In in Firebase Console.";
        } else if (typeof errorObj.message === "string") {
          message = errorObj.message;
        }
      }
      setAuthError(message);
      return { error: message };
    }
  }, [triggerLoginToast]);

  const signOut = useCallback(async () => {
    try {
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("login_success_pending");
      }
      setShowLoginToast(false);
      const activeAuth = auth || getClientAuth();
      if (activeAuth) {
        await firebaseSignOut(activeAuth).catch(() => {});
      }
      await fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
    } finally {
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("login_success_pending");
      }
      setTokenCookie(null);
      setUser(null);
      setShowLoginToast(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authError,
        clearAuthError,
        isAuthOpen,
        openAuth,
        closeAuth,
        signInWithGoogle,
        signOut,
        getIdToken,
        showLoginToast,
        toastKey,
        dismissLoginToast,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
