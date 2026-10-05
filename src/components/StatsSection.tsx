export default function StatsSection() {
  return (
    <section
      aria-label="Quick stats"
      className="relative overflow-hidden border-t"
      style={{ borderColor: "var(--line)" }}
    >
      <div className="glow left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40" />

      <div className="relative mx-auto max-w-[72rem] px-6 py-16 md:px-10 md:py-20">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div
            className="reveal stat-card group relative overflow-hidden rounded-3xl border p-7 text-center sm:p-8"
            style={{ borderColor: "var(--line)", background: "#FBF7F1" }}
          >
            <span className="stat-icon" style={{ color: "#B8611F" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </span>
            <p
              className="mt-4 font-serif text-4xl md:text-5xl"
              style={{ color: "#3F200D", letterSpacing: "-0.02em" }}
            >
              7
            </p>
            <p
              className="mt-2 font-mono text-[11px] uppercase tracking-wider"
              style={{ color: "#8A5A3A" }}
            >
              Projects built
            </p>
          </div>

          <div
            className="reveal reveal-delay-1 stat-card group relative overflow-hidden rounded-3xl border p-7 text-center sm:p-8"
            style={{
              borderColor: "rgba(255,255,255,.08)",
              background: "linear-gradient(155deg,#4A2A17,#26150A)",
            }}
          >
            <span className="stat-icon" style={{ color: "#F0A15A" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
                <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </span>
            <p
              className="mt-4 font-serif text-4xl md:text-5xl"
              style={{ color: "#FFFFFF", letterSpacing: "-0.02em" }}
            >
              2.5 yrs
            </p>
            <p
              className="mt-2 font-mono text-[11px] uppercase tracking-wider"
              style={{ color: "#E0B48C" }}
            >
              Self-taught journey
            </p>
          </div>

          <div
            className="reveal reveal-delay-2 stat-card group relative overflow-hidden rounded-3xl border p-7 text-center sm:p-8"
            style={{ borderColor: "var(--line)", background: "#FBF7F1" }}
          >
            <span className="stat-icon" style={{ color: "#B8611F" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M14.5 3.5 21 10l-4.2 4.2M9.5 20.5 3 14l4.2-4.2M6 18 18 6"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <p
              className="mt-4 font-serif text-4xl md:text-5xl"
              style={{ color: "#3F200D", letterSpacing: "-0.02em" }}
            >
              14
            </p>
            <p
              className="mt-2 font-mono text-[11px] uppercase tracking-wider"
              style={{ color: "#8A5A3A" }}
            >
              Tools &amp; tech
            </p>
          </div>

          <div
            className="reveal reveal-delay-3 stat-card group relative overflow-hidden rounded-3xl border p-7 text-center sm:p-8"
            style={{
              borderColor: "rgba(255,255,255,.08)",
              background: "linear-gradient(155deg,#4A2A17,#26150A)",
            }}
          >
            <span className="stat-icon" style={{ color: "#F0A15A" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="m4 12.5 5.5 5.5L20 7"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <p
              className="mt-4 font-serif text-4xl md:text-5xl"
              style={{ color: "#FFFFFF", letterSpacing: "-0.02em" }}
            >
              100%
            </p>
            <p
              className="mt-2 font-mono text-[11px] uppercase tracking-wider"
              style={{ color: "#E0B48C" }}
            >
              Real, working code
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
