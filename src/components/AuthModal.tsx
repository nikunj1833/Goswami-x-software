"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";

export default function AuthModal() {
  const { isAuthOpen, closeAuth, signInWithGoogle } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleClose = useCallback(() => {
    setError(null);
    setSubmitting(false);
    closeAuth();
  }, [closeAuth]);

  // Focus management & overflow control
  useEffect(() => {
    if (isAuthOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [isAuthOpen]);

  // Keyboard navigation (Escape key closes modal)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isAuthOpen) {
        handleClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isAuthOpen, handleClose]);

  const handleGoogleSignIn = async () => {
    setError(null);
    setSubmitting(true);
    try {
      const result = await signInWithGoogle();
      if (result?.error) {
        setError(result.error);
        setSubmitting(false);
      }
      // If no error, browser redirects to Google OAuth
    } catch {
      setError("An unexpected error occurred while connecting to Google. Please try again.");
      setSubmitting(false);
    }
  };

  if (!isAuthOpen) {
    return (
      <div
        id="authModal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="authTitle"
        className="hidden"
      />
    );
  }

  return (
    <div
      id="authModal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="authTitle"
      className="open"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        className="auth-panel relative rounded-3xl border p-7 sm:p-8"
        style={{
          borderColor: "var(--line)",
          background: "var(--bg-soft)",
          boxShadow: "0 40px 90px -30px rgba(0,0,0,.6)",
        }}
      >
        <button
          id="authClose"
          type="button"
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border text-sm transition-colors hover:opacity-100 cursor-pointer"
          style={{ borderColor: "var(--line)", color: "var(--fg-soft)" }}
          onClick={handleClose}
        >
          ✕
        </button>

        <p className="stack-eyebrow" style={{ color: "var(--accent)" }}>
          Goswami X Software
        </p>

        <h2 id="authTitle" className="mt-2 font-serif text-3xl" style={{ color: "var(--fg)" }}>
          Sign in
        </h2>

        <p id="authSub" className="mt-2 text-sm leading-relaxed" style={{ color: "var(--fg-soft)" }}>
          Sign in with your Google account to access your profile and saved sessions.
        </p>

        <div className="mt-8 space-y-4">
          <button
            id="googleSignInBtn"
            type="button"
            onClick={handleGoogleSignIn}
            disabled={submitting}
            className="flex w-full items-center justify-center gap-3 rounded-full border px-6 py-3.5 text-sm font-medium transition-all hover:bg-[var(--line)] cursor-pointer disabled:opacity-50"
            style={{
              borderColor: "var(--line)",
              background: "var(--bg)",
              color: "var(--fg)",
            }}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>{submitting ? "Redirecting to Google..." : "Continue with Google"}</span>
          </button>

          {error && (
            <p id="authError" className="text-xs text-center" style={{ color: "#E2694A" }} role="alert">
              {error}
            </p>
          )}
        </div>

        <p
          className="mt-8 text-center text-[11px] leading-relaxed"
          style={{ color: "var(--fg-soft)" }}
        >
          Secure Google authentication powered by Supabase Auth.
        </p>
      </div>
    </div>
  );
}
