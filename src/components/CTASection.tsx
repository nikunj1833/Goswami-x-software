export default function CTASection() {
  return (
    <section
      className="relative overflow-hidden border-t"
      style={{
        borderColor: "var(--line)",
        backgroundColor: "rgba(var(--bg-soft-rgb),0.93)",
      }}
    >
      <div className="glow left-1/2 top-0 -translate-x-1/2 opacity-60" />

      <div className="relative mx-auto max-w-[48rem] px-6 py-20 text-center md:px-10 md:py-28">
        <h2
          className="reveal font-serif text-3xl leading-tight md:text-5xl"
          style={{ color: "var(--fg)" }}
        >
          Have something in mind?{" "}
          <span className="gradient-text italic">Let&apos;s build it.</span>
        </h2>
        <a
          href="#contact"
          className="reveal reveal-delay-1 btn-primary mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-medium"
          style={{ color: "var(--bg)" }}
        >
          Start a project <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
