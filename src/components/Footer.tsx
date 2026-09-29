"use client";

import FooterWordmark from "./FooterWordmark";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="relative z-[2] overflow-hidden border-t"
      style={{
        borderColor: "var(--line)",
        backgroundColor: "rgba(var(--bg-rgb),0.93)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div className="glow left-1/2 -bottom-40 -translate-x-1/2 opacity-80" />

      <FooterWordmark />

      <div className="relative mx-auto max-w-[72rem] px-6 pb-10 pt-8 md:px-10 md:pt-10">
        <div
          className="flex flex-col items-center gap-12 border-b pb-12 text-center md:flex-row md:items-center md:justify-between md:text-left"
          style={{ borderColor: "var(--line)" }}
        >
          <div className="max-w-sm">
            <a href="#top" className="logo-mark font-serif text-2xl" style={{ color: "var(--fg)" }}>
              Goswami <span className="gradient-text italic">X Software</span>
            </a>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--fg-soft)" }}>
              Nikunj Giri — self-taught Full-Stack Developer building real projects across web and
              mobile, one at a time.
            </p>
            <a
              href="#contact"
              className="btn-primary mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium"
              style={{ color: "var(--bg)" }}
            >
              Start a project
              <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className="grid grid-cols-1 gap-10 place-items-center sm:grid-cols-2 sm:place-items-start">
            <div className="text-center sm:text-left">
              <p
                className="font-mono text-xs uppercase tracking-wide"
                style={{ color: "var(--accent)" }}
              >
                Navigate
              </p>
              <ul className="mt-4 space-y-2.5 text-sm" style={{ color: "var(--fg-soft)" }}>
                <li>
                  <a href="#work" className="nav-link transition-colors hover:opacity-100">
                    Work
                  </a>
                </li>
                <li>
                  <a href="#stack" className="nav-link transition-colors hover:opacity-100">
                    Stack
                  </a>
                </li>
                <li>
                  <a href="#about" className="nav-link transition-colors hover:opacity-100">
                    About
                  </a>
                </li>
                <li>
                  <a href="#experience" className="nav-link transition-colors hover:opacity-100">
                    Journey
                  </a>
                </li>
                <li>
                  <a href="#contact" className="nav-link transition-colors hover:opacity-100">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p
                className="font-mono text-xs uppercase tracking-wide"
                style={{ color: "var(--accent)" }}
              >
                Elsewhere
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2.5 sm:justify-start">
                <span
                  className="chip flex h-10 w-10 items-center justify-center rounded-full border opacity-50"
                  style={{ borderColor: "var(--line)", cursor: "not-allowed" }}
                  title="GitHub — add your profile link"
                  aria-label="GitHub, coming soon"
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{ color: "var(--fg)" }}
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M12 .5C5.73.5.98 5.24.98 11.52c0 4.94 3.2 9.13 7.65 10.61.56.1.76-.24.76-.54v-1.9c-3.11.68-3.77-1.5-3.77-1.5-.51-1.3-1.24-1.65-1.24-1.65-1.02-.7.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 1.72 2.62 1.22 3.26.94.1-.73.39-1.22.7-1.5-2.48-.28-5.1-1.24-5.1-5.53 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.08 1.15a10.6 10.6 0 0 1 5.6 0C17.4 4.98 18.34 5.28 18.34 5.28c.61 1.53.23 2.67.11 2.95.72.78 1.15 1.78 1.15 3 0 4.3-2.63 5.24-5.12 5.52.4.35.77 1.03.77 2.08v3.08c0 .3.2.65.77.54 4.44-1.48 7.64-5.67 7.64-10.61C23.02 5.24 18.27.5 12 .5Z"
                    />
                  </svg>
                </span>

                <span
                  className="chip flex h-10 w-10 items-center justify-center rounded-full border opacity-50"
                  style={{ borderColor: "var(--line)", cursor: "not-allowed" }}
                  title="LinkedIn — add your profile link"
                  aria-label="LinkedIn, coming soon"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{ color: "var(--fg)" }}
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.03-1.85-3.03-1.86 0-2.14 1.45-2.14 2.94v5.66H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z"
                    />
                  </svg>
                </span>

                <span
                  className="chip flex h-10 w-10 items-center justify-center rounded-full border opacity-50"
                  style={{ borderColor: "var(--line)", cursor: "not-allowed" }}
                  title="Instagram — add your profile link"
                  aria-label="Instagram, coming soon"
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{ color: "var(--fg)" }}
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.05.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.05.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.05-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.05-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07ZM12 0C8.74 0 8.33.01 7.05.07c-1.27.06-2.15.26-2.91.56a5.87 5.87 0 0 0-2.12 1.38A5.87 5.87 0 0 0 .64 4.13c-.3.76-.5 1.64-.56 2.91C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.38 2.12a5.87 5.87 0 0 0 2.12 1.38c.76.3 1.64.5 2.91.56 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.87 5.87 0 0 0 2.12-1.38 5.87 5.87 0 0 0 1.38-2.12c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.87 5.87 0 0 0-1.38-2.12A5.87 5.87 0 0 0 19.87.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84Zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z"
                    />
                  </svg>
                </span>

                <span
                  className="chip flex h-10 w-10 items-center justify-center rounded-full border opacity-50"
                  style={{ borderColor: "var(--line)", cursor: "not-allowed" }}
                  title="Email — add your address"
                  aria-label="Email, coming soon"
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{ color: "var(--fg)" }}
                    aria-hidden="true"
                  >
                    <path stroke="currentColor" strokeWidth="1.6" d="M3 6.5h18v11H3z" />
                    <path stroke="currentColor" strokeWidth="1.6" d="m3.5 7 8.5 6.5L20.5 7" />
                  </svg>
                </span>
              </div>
              <p className="mt-3 text-xs" style={{ color: "var(--fg-soft)" }}>
                Links coming soon
              </p>
            </div>
          </div>
        </div>

        <div
          className="mt-8 flex flex-col items-center gap-3 border-t pt-6 text-center text-xs sm:flex-row sm:items-center sm:justify-between sm:text-left"
          style={{ borderColor: "var(--line)", color: "var(--fg-soft)" }}
        >
          <p>© 2026 Nikunj Giri · Goswami X Software. All rights reserved.</p>
          <button
            id="toTopInline"
            type="button"
            onClick={scrollToTop}
            className="transition-colors hover:opacity-100 cursor-pointer"
            style={{ color: "var(--fg-soft)" }}
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
