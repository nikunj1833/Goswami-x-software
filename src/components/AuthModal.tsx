"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";

export default function AuthModal() {
  const { isAuthOpen, authMode, closeAuth, setAuthMode, signIn, signUp } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);

  const handleClose = useCallback(() => {
    setError(null);
    setName("");
    setEmail("");
    setPassword("");
    closeAuth();
  }, [closeAuth]);

  useEffect(() => {
    if (isAuthOpen) {
      document.documentElement.style.overflow = "hidden";
      const timer = setTimeout(() => {
        if (authMode === "signup") {
          nameInputRef.current?.focus();
        } else {
          emailInputRef.current?.focus();
        }
      }, 60);
      return () => clearTimeout(timer);
    } else {
      document.documentElement.style.overflow = "";
    }
  }, [isAuthOpen, authMode]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isAuthOpen) {
        handleClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isAuthOpen, handleClose]);

  const handleModeSwitch = (mode: "signin" | "signup") => {
    setError(null);
    setAuthMode(mode);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (authMode === "signup") {
      const res = signUp(name, email);
      if (!res.success) {
        setError(res.error || "Failed to create account.");
      } else {
        handleClose();
      }
    } else {
      const res = signIn(email);
      if (!res.success) {
        setError(res.error || "Failed to sign in.");
      } else {
        handleClose();
      }
    }
  };

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
          {authMode === "signup" ? "Create your account" : "Welcome back"}
        </h2>
        <p id="authSub" className="mt-2 text-sm" style={{ color: "var(--fg-soft)" }}>
          {authMode === "signup"
            ? "Join to keep your details for the next visit."
            : "Sign in to continue."}
        </p>

        <div
          className="mt-6 grid grid-cols-2 gap-1 rounded-full border p-1"
          style={{ borderColor: "var(--line)" }}
          role="tablist"
        >
          <button
            type="button"
            className="auth-tab rounded-full py-2 text-sm cursor-pointer"
            data-mode="signin"
            role="tab"
            aria-selected={authMode === "signin"}
            onClick={() => handleModeSwitch("signin")}
          >
            Sign in
          </button>
          <button
            type="button"
            className="auth-tab rounded-full py-2 text-sm cursor-pointer"
            data-mode="signup"
            role="tab"
            aria-selected={authMode === "signup"}
            onClick={() => handleModeSwitch("signup")}
          >
            Create account
          </button>
        </div>

        <form id="authForm" className="mt-5 space-y-4" onSubmit={handleSubmit} noValidate>
          {authMode === "signup" && (
            <div id="authNameWrap">
              <label
                htmlFor="auth-name"
                className="mb-1.5 block font-mono text-xs"
                style={{ color: "var(--fg-soft)" }}
              >
                Full name
              </label>
              <input
                ref={nameInputRef}
                id="auth-name"
                type="text"
                autoComplete="name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="field w-full rounded-lg px-4 py-3 text-sm outline-none"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="auth-email"
              className="mb-1.5 block font-mono text-xs"
              style={{ color: "var(--fg-soft)" }}
            >
              Email
            </label>
            <input
              ref={emailInputRef}
              id="auth-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="field w-full rounded-lg px-4 py-3 text-sm outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="auth-pass"
              className="mb-1.5 block font-mono text-xs"
              style={{ color: "var(--fg-soft)" }}
            >
              Password
            </label>
            <input
              id="auth-pass"
              type="password"
              autoComplete={authMode === "signup" ? "new-password" : "current-password"}
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="field w-full rounded-lg px-4 py-3 text-sm outline-none"
            />
          </div>

          {error && (
            <p id="authError" className="text-xs" style={{ color: "#E2694A" }} role="alert">
              {error}
            </p>
          )}

          <button
            id="authSubmit"
            type="submit"
            className="btn-primary w-full rounded-full px-6 py-3 text-sm font-medium cursor-pointer"
            style={{ color: "var(--bg)" }}
          >
            {authMode === "signup" ? "Create account" : "Sign in"}
          </button>
        </form>

        <p
          className="mt-4 text-center text-[11px] leading-relaxed"
          style={{ color: "var(--fg-soft)" }}
        >
          Preview sign-in — only your name and email are kept, in this browser. Your password is
          never stored or sent anywhere.
        </p>
      </div>
    </div>
  );
}
