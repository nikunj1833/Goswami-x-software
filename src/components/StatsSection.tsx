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
            className="reveal stat-card group relative overflow-hidden rounded-3xl border p-7 text-center sm:p-8 transition-all duration-300 hover:border-[var(--accent)]"
            style={{
              borderColor: "var(--line)",
              background: "linear-gradient(155deg, var(--surface) 0%, var(--bg-soft) 100%)",
              boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2)",
            }}
          >
            <span className="stat-icon inline-flex items-center justify-center p-2 rounded-xl" style={{ color: "var(--accent)", backgroundColor: "color-mix(in srgb, var(--accent) 12%, transparent)" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </span>
            <p
              className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl"
              style={{ color: "var(--fg)", letterSpacing: "-0.02em" }}
            >
              7
            </p>
            <p
              className="mt-2 font-mono text-[11px] uppercase tracking-wider"
              style={{ color: "var(--fg-soft)" }}
            >
              Projects built
            </p>
          </div>

          <div
            className="reveal reveal-delay-1 stat-card group relative overflow-hidden rounded-3xl border p-7 text-center sm:p-8 transition-all duration-300 hover:border-[var(--accent)]"
            style={{
              borderColor: "var(--line)",
              background: "linear-gradient(155deg, var(--surface) 0%, var(--bg-soft) 100%)",
              boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2)",
            }}
          >
            <span className="stat-icon inline-flex items-center justify-center p-2 rounded-xl" style={{ color: "var(--accent)", backgroundColor: "color-mix(in srgb, var(--accent) 12%, transparent)" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
                <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </span>
            <p
              className="mt-4 font-serif text-2xl sm:text-3xl md:text-4xl"
              style={{ color: "var(--fg)", letterSpacing: "-0.02em" }}
            >
              Apps + Games
            </p>
            <p
              className="mt-2 font-mono text-[11px] uppercase tracking-wider"
              style={{ color: "var(--fg-soft)" }}
            >
              Product focus
            </p>
          </div>

          <div
            className="reveal reveal-delay-2 stat-card group relative overflow-hidden rounded-3xl border p-7 text-center sm:p-8 transition-all duration-300 hover:border-[var(--accent)]"
            style={{
              borderColor: "var(--line)",
              background: "linear-gradient(155deg, var(--surface) 0%, var(--bg-soft) 100%)",
              boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2)",
            }}
          >
            <span className="stat-icon inline-flex items-center justify-center p-2 rounded-xl" style={{ color: "var(--accent)", backgroundColor: "color-mix(in srgb, var(--accent) 12%, transparent)" }}>
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
              className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl"
              style={{ color: "var(--fg)", letterSpacing: "-0.02em" }}
            >
              14
            </p>
            <p
              className="mt-2 font-mono text-[11px] uppercase tracking-wider"
              style={{ color: "var(--fg-soft)" }}
            >
              Tools &amp; tech
            </p>
          </div>

          <div
            className="reveal reveal-delay-3 stat-card group relative overflow-hidden rounded-3xl border p-7 text-center sm:p-8 transition-all duration-300 hover:border-[var(--accent)]"
            style={{
              borderColor: "var(--line)",
              background: "linear-gradient(155deg, var(--surface) 0%, var(--bg-soft) 100%)",
              boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2)",
            }}
          >
            <span className="stat-icon inline-flex items-center justify-center p-2 rounded-xl" style={{ color: "var(--accent)", backgroundColor: "color-mix(in srgb, var(--accent) 12%, transparent)" }}>
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
              className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl"
              style={{ color: "var(--fg)", letterSpacing: "-0.02em" }}
            >
              100%
            </p>
            <p
              className="mt-2 font-mono text-[11px] uppercase tracking-wider"
              style={{ color: "var(--fg-soft)" }}
            >
              Real, working code
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
