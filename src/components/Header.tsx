"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const headerRef = useRef<HTMLElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, authError, clearAuthError, openAuth, signOut } = useAuth();

  const getAvatarInitial = useCallback((): string => {
    // 1. Try profile/user full name or display name
    const rawName = user?.displayName || user?.name;

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
    const email = user?.email;
    if (email && typeof email === "string") {
      const cleanEmail = email.trim();
      if (cleanEmail.length > 0) {
        return cleanEmail.charAt(0).toUpperCase();
      }
    }

    return "U";
  }, [user?.displayName, user?.name, user?.email]);

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    if (!isDropdownOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDropdownOpen]);

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

  const userEmail = user?.email;
  const userName = user?.name || user?.displayName || userEmail || "User";

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
          {user ? (
            <div ref={dropdownRef} className="relative">
              <button
                id="authAvatarBtn"
                type="button"
                className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full font-serif font-semibold text-sm transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm overflow-hidden focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                style={{
                  background: "linear-gradient(135deg, var(--accent-soft), var(--accent))",
                  color: "var(--bg)",
                  border: "1.5px solid var(--line)",
                }}
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                aria-label={`User profile for ${userName}`}
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
                title={`${userName} · click to view profile`}
              >
                {user?.photoURL ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.photoURL}
                    alt={userName}
                    className="h-full w-full object-cover rounded-full"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span>{getAvatarInitial()}</span>
                )}
              </button>

              {isDropdownOpen && (
                <div
                  id="profileDropdown"
                  role="menu"
                  aria-label="User Profile Menu"
                  className="absolute right-0 mt-3 w-72 sm:w-80 rounded-2xl border p-4 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in zoom-in-95"
                  style={{
                    backgroundColor: "var(--bg-soft)",
                    borderColor: "var(--line)",
                    boxShadow: "0 20px 50px -15px rgba(0,0,0,0.5)",
                  }}
                >
                  <div
                    className="flex items-center gap-3.5 pb-3.5 border-b"
                    style={{ borderColor: "var(--line)" }}
                  >
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-serif font-semibold text-base overflow-hidden"
                      style={{
                        background: "linear-gradient(135deg, var(--accent-soft), var(--accent))",
                        color: "var(--bg)",
                        border: "1.5px solid var(--line)",
                      }}
                    >
                      {user?.photoURL ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={user.photoURL}
                          alt={userName}
                          className="h-full w-full object-cover rounded-full"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <span>{getAvatarInitial()}</span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        id="profileDropdownName"
                        className="font-medium text-sm truncate"
                        style={{ color: "var(--fg)" }}
                      >
                        {userName}
                      </p>
                      {userEmail && (
                        <p
                          id="profileDropdownEmail"
                          className="text-xs break-all leading-relaxed font-mono opacity-80 mt-0.5"
                          style={{ color: "var(--fg-soft)" }}
                        >
                          {userEmail}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="pt-3">
                    <button
                      id="dropdownLogoutBtn"
                      type="button"
                      className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-medium transition-all hover:bg-[var(--line)] cursor-pointer"
                      style={{
                        color: "var(--fg)",
                        border: "1px solid var(--line)",
                        backgroundColor: "var(--surface)",
                      }}
                      onClick={() => {
                        setIsDropdownOpen(false);
                        signOut();
                      }}
                    >
                      <svg
                        className="h-4 w-4 opacity-75"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      <span>Sign out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              id="authBtn"
              type="button"
              className="auth-btn inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium sm:px-4 sm:text-sm cursor-pointer"
              style={{ borderColor: "var(--line)", color: "var(--fg)" }}
              onClick={() => openAuth("signin")}
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
