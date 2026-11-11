import Link from "next/link";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden border-t"
      style={{
        borderColor: "var(--line)",
        backgroundColor: "rgba(var(--bg-soft-rgb),0.93)",
      }}
    >
      <div className="glow -left-40 bottom-0 opacity-60" />

      <div className="relative mx-auto grid max-w-[72rem] gap-12 px-6 py-20 md:grid-cols-[1.1fr_0.9fr] md:gap-16 md:px-10 md:py-28">
        <div className="reveal">
          <p className="font-mono text-xs uppercase tracking-widest" style={{ color: "var(--accent)" }}>
            Business Identity · Sole Proprietorship
          </p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl" style={{ color: "var(--fg)" }}>
            About RN Developer
          </h2>
          <div
            className="mt-6 max-w-[38rem] space-y-4 text-base leading-relaxed"
            style={{ color: "var(--fg-soft)" }}
          >
            <p>
              RN Developer is the public-facing brand of <strong>RN SOFTWARE DEVELOPER</strong>, an independent
              software development business dedicated to engineering high-quality digital products across mobile applications,
              casual games, and modern web platforms.
            </p>
            <p>
              Instead of relying on generic templates or tutorial clones, every project is built with clean architecture,
              responsive design, and native performance in mind. Whether crafting an Android app with Kotlin or React Native,
              implementing a 2D arcade gameplay loop, or building a custom management tool, our focus is always on shipping
              dependable software that actually works.
            </p>
            <p>
              We prioritize direct, transparent communication: you work directly with the developer building your software from the
              initial planning and design phases to testing, release packaging, and maintenance.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/about"
              className="btn-primary inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-medium"
              style={{ color: "var(--bg)" }}
            >
              Read Full Story &amp; Principles
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-xs sm:text-sm font-medium transition-colors hover:opacity-100"
              style={{ borderColor: "var(--line)", color: "var(--fg)" }}
            >
              Get in Touch
            </Link>
          </div>
        </div>

        <div className="reveal reveal-delay-1 space-y-8">
          <div className="rounded-2xl border p-6" style={{ backgroundColor: "var(--surface)", borderColor: "var(--line)" }}>
            <h3 className="font-mono text-xs uppercase tracking-wider" style={{ color: "var(--accent)" }}>
              Core Specializations
            </h3>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--fg)" }}>
              Android mobile applications, casual 2D game development, Google Play Console release preparation, and responsive Next.js web applications.
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5 font-mono text-[11px]" style={{ color: "var(--accent)" }}>
              <span className="rounded border px-2 py-0.5" style={{ borderColor: "var(--line)" }}>Kotlin</span>
              <span className="rounded border px-2 py-0.5" style={{ borderColor: "var(--line)" }}>React Native</span>
              <span className="rounded border px-2 py-0.5" style={{ borderColor: "var(--line)" }}>Android Studio</span>
              <span className="rounded border px-2 py-0.5" style={{ borderColor: "var(--line)" }}>Next.js</span>
              <span className="rounded border px-2 py-0.5" style={{ borderColor: "var(--line)" }}>Firebase</span>
            </div>
          </div>

          <div className="rounded-2xl border p-6" style={{ backgroundColor: "var(--surface)", borderColor: "var(--line)" }}>
            <h3 className="font-mono text-xs uppercase tracking-wider" style={{ color: "var(--accent)" }}>
              Engineering Philosophy
            </h3>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--fg)" }}>
              Direct collaboration, transparent milestone delivery, zero bloated third-party dependencies, and thorough testing across target devices.
            </p>
          </div>

          <div className="rounded-2xl border p-6" style={{ backgroundColor: "var(--surface)", borderColor: "var(--line)" }}>
            <h3 className="font-mono text-xs uppercase tracking-wider" style={{ color: "var(--accent)" }}>
              Client Engagement
            </h3>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--fg)" }}>
              Open for project inquiries from individual creators, startups, and businesses looking for genuine, reliable software execution.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
