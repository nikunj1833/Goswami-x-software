"use client";

import { useEffect, useRef } from "react";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const headerRef = useRef<HTMLElement | null>(null);
  const { user, supabaseUser, authError, clearAuthError, openAuth, signOut } = useAuth();

  const getAvatarInitial = (): string => {
    // 1. Try profile/user full name or display name
    const rawName =
      user?.displayName ||
      user?.name ||
      (supabaseUser?.user_metadata?.full_name as string | undefined) ||
      (supabaseUser?.user_metadata?.name as string | undefined);

    if (rawName && typeof rawName === "string") {
      const cleanName = rawName.trim();
      if (cleanName.length > 0) {
        // First name initial (e.g. "Nikunj Giri" -> "Nikunj" -> "N")
        const firstName = cleanName.split(/\s+/)[0];
        if (firstName && firstName.length > 0) {
          return firstName.charAt(0).toUpperCase();
        }
      }
    }

    // 2. Fallback to first letter of email
    const email = user?.email || supabaseUser?.email;
    if (email && typeof email === "string") {
      const cleanEmail = email.trim();
      if (cleanEmail.length > 0) {
        return cleanEmail.charAt(0).toUpperCase();
      }
    }

    return "U";
  };

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    function setHeaderHeight() {
      if (header) {
        document.documentElement.style.setProperty(
          "--header-h",
          `${Math.ceil(header.getBoundingClientRect().height)}px`
        );
      }
    }

    setHeaderHeight();
    window.addEventListener("resize", setHeaderHeight);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(setHeaderHeight);
    }

    const t1 = setTimeout(setHeaderHeight, 300);
    const t2 = setTimeout(setHeaderHeight, 1000);

    return () => {
      window.removeEventListener("resize", setHeaderHeight);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    console.log("[AuthTrace][Header Received User State]", {
      hasUser: Boolean(user),
      hasSupabaseUser: Boolean(supabaseUser),
      avatarInitial: (user || supabaseUser) ? getAvatarInitial() : null,
      email: user?.email || supabaseUser?.email || null,
    });
  }, [user, supabaseUser]);

  const handleAuthClick = () => {
    if (user || supabaseUser) {
      signOut();
    } else {
      openAuth("signin");
    }
  };

  const userEmail = user?.email || supabaseUser?.email;
  const userName = user?.name || (supabaseUser?.user_metadata?.full_name as string) || userEmail || "User";

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-30 border-b backdrop-blur-md transition-all"
      style={{
        paddingTop: "env(safe-area-inset-top, 0px)",
        borderColor: "var(--line)",
        backgroundColor: "color-mix(in srgb, var(--bg) 85%, transparent)",
      }}
    >
      <nav
        aria-label="Main Navigation"
        className="mx-auto flex max-w-[72rem] items-center justify-between px-6 py-5 md:px-10"
      >
        <a
          href="#top"
          className="logo-mark font-serif text-[1.15rem] sm:text-2xl md:text-[1.7rem]"
          style={{ color: "var(--fg)" }}
        >
          Goswami <span className="gradient-text italic">X Software</span>
        </a>

        <ul
          className="hidden items-center gap-9 text-sm md:flex"
          style={{ color: "var(--fg-soft)" }}
        >
          <li>
            <a
              href="#work"
              className="nav-link transition-colors hover:opacity-100"
              style={{ color: "var(--fg-soft)" }}
            >
              Work
            </a>
          </li>
          <li>
            <a
              href="#stack"
              className="nav-link transition-colors"
              style={{ color: "var(--fg-soft)" }}
            >
              Stack
            </a>
          </li>
          <li>
            <a
              href="#approach"
              className="nav-link transition-colors"
              style={{ color: "var(--fg-soft)" }}
            >
              Approach
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="nav-link transition-colors"
              style={{ color: "var(--fg-soft)" }}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#faq"
              className="nav-link transition-colors"
              style={{ color: "var(--fg-soft)" }}
            >
              FAQ
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="nav-link transition-colors"
              style={{ color: "var(--fg-soft)" }}
            >
              Contact
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-2 sm:gap-4">
          {user || supabaseUser ? (
            <div className="flex items-center gap-2.5">
              <button
                id="authAvatarBtn"
                type="button"
                className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full font-serif font-semibold text-sm transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
                style={{
                  background: "linear-gradient(135deg, var(--accent-soft), var(--accent))",
                  color: "var(--bg)",
                  border: "1.5px solid var(--line)",
                }}
                onClick={handleAuthClick}
                aria-label={`Signed in as ${userName} (${userEmail}). Click to sign out.`}
                title={`${userName} (${userEmail}) · click to sign out`}
              >
                <span>{getAvatarInitial()}</span>
              </button>
              {userEmail && (
                <span
                  id="userEmailDisplay"
                  className="hidden xl:inline text-xs font-mono max-w-[170px] truncate select-none opacity-80"
                  style={{ color: "var(--fg-soft)" }}
                  title={`${userName} (${userEmail})`}
                >
                  {userEmail}
                </span>
              )}
            </div>
          ) : (
            <button
              id="authBtn"
              type="button"
              className="auth-btn inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium sm:px-4 sm:text-sm cursor-pointer"
              style={{ borderColor: "var(--line)", color: "var(--fg)" }}
              onClick={handleAuthClick}
              aria-label="Sign in"
            >
              Sign in
            </button>
          )}

          <ThemeToggle />

          <a
            href="#contact"
            className="btn-primary hidden rounded-full px-4 py-2 text-sm font-medium sm:inline-block"
            style={{ color: "var(--bg)" }}
          >
            Get in touch
          </a>
        </div>
      </nav>

      {/* Visible alert banner if OAuth provider or callback returns an error */}
      {authError && (
        <div
          role="alert"
          className="mx-auto my-2 flex max-w-[72rem] items-center justify-between gap-3 rounded-2xl border px-4 py-2.5 text-xs sm:text-sm shadow-md"
          style={{
            borderColor: "rgba(226, 105, 74, 0.4)",
            backgroundColor: "rgba(35, 15, 12, 0.95)",
            color: "#FFAAA0",
          }}
        >
          <div className="flex items-center gap-2 truncate">
            <span className="text-base select-none">⚠️</span>
            <span className="truncate">
              <strong>Google Auth Notice:</strong> {authError}
            </span>
          </div>
          <button
            type="button"
            onClick={clearAuthError}
            className="shrink-0 rounded-full px-2.5 py-0.5 text-xs border transition-colors hover:bg-white/10 cursor-pointer"
            style={{ borderColor: "rgba(226, 105, 74, 0.4)" }}
          >
            Dismiss
          </button>
        </div>
      )}
    </header>
  );
}
