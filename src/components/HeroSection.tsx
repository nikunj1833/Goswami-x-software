export default function HeroSection() {
  return (
    <section
      id="top"
      className="relative mx-auto max-w-[72rem] px-6 pb-24 pt-16 md:px-10 md:pb-32 md:pt-20 overflow-hidden"
    >
      <div className="glow -top-40 -left-40" />

      <p
        className="hero-line font-mono text-sm"
        style={{ color: "var(--accent)", animationDelay: ".05s" }}
      >
        <span
          className="dot-pulse mr-2 inline-block h-2 w-2 rounded-full align-middle"
          style={{ backgroundColor: "var(--accent)" }}
        />
        Full-Stack Developer · Self-Taught
      </p>

      <h1
        className="relative mt-7 max-w-4xl font-serif text-[clamp(1.75rem,7.5vw,2.75rem)] leading-[1.08] tracking-tight sm:text-6xl md:text-[5.25rem]"
        style={{ color: "var(--fg)" }}
      >
        <span className="hero-line block" style={{ animationDelay: ".15s" }}>
          Nikunj Giri builds
        </span>
        <span className="hero-line block" style={{ animationDelay: ".28s" }}>
          software that feels <span className="gradient-text italic">real</span>,
        </span>
        <span className="hero-line block" style={{ animationDelay: ".41s" }}>
          one project at a time.
        </span>
      </h1>

      <p
        className="hero-line relative mt-8 max-w-[38rem] text-lg leading-relaxed"
        style={{ color: "var(--fg-soft)", animationDelay: ".56s" }}
      >
        Self-taught full-stack developer building real projects across web and mobile — this is{" "}
        <span className="gradient-text">Goswami X Software</span>.
      </p>

      <div
        className="hero-line relative mt-10 flex flex-wrap items-center gap-4"
        style={{ animationDelay: ".7s" }}
      >
        <a
          href="#work"
          className="btn-primary rounded-full px-6 py-3 text-sm font-medium"
          style={{ color: "var(--bg)" }}
        >
          View selected work
        </a>
        <a
          href="#contact"
          className="text-sm underline underline-offset-4 transition-colors"
          style={{ color: "var(--fg-soft)", textDecorationColor: "var(--line)" }}
        >
          Let&apos;s talk
        </a>
      </div>
    </section>
  );
}
