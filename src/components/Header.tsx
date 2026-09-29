"use client";

import { useEffect, useRef } from "react";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const headerRef = useRef<HTMLElement | null>(null);
  const { user, openAuth, signOut } = useAuth();

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

  const handleAuthClick = () => {
    if (user) {
      signOut();
    } else {
      openAuth("signin");
    }
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-30 border-b backdrop-blur-md"
      style={{
        paddingTop: "env(safe-area-inset-top, 0px)",
        borderColor: "var(--line)",
        backgroundColor: "color-mix(in srgb, var(--bg) 80%, transparent)",
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
          <button
            id="authBtn"
            type="button"
            className="auth-btn inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium sm:px-4 sm:text-sm"
            style={{ borderColor: "var(--line)", color: "var(--fg)" }}
            onClick={handleAuthClick}
            aria-label={
              user
                ? `Signed in as ${user.name}. Click to sign out.`
                : "Sign in"
            }
            title={user ? `${user.name} · click to sign out` : undefined}
          >
            {user && user.name ? (
              <>
                <span className="auth-avatar">
                  {user.name.trim().charAt(0).toUpperCase()}
                </span>
                <span className="hidden sm:inline">Sign out</span>
              </>
            ) : (
              "Sign in"
            )}
          </button>

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
    </header>
  );
}
