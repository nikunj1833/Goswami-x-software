export default function ApproachSection() {
  return (
    <section
      id="approach"
      className="relative overflow-hidden border-t"
      style={{ borderColor: "var(--line)" }}
    >
      <div className="glow -left-40 top-10 opacity-50" />

      <div className="relative mx-auto max-w-[72rem] px-6 py-20 md:px-10 md:py-28">
        <h2 className="reveal font-serif text-3xl md:text-4xl" style={{ color: "var(--fg)" }}>
          How I work
        </h2>
        <p className="reveal mt-4 max-w-[38rem]" style={{ color: "var(--fg-soft)" }}>
          A few things that shape every project I build.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          <div className="reveal card-frame">
            <div
              className="card-inner relative h-full overflow-hidden rounded-2xl border p-7 transition-all duration-300 hover:border-[var(--accent)]"
              style={{
                borderColor: "var(--line)",
                background: "linear-gradient(155deg, var(--surface) 0%, var(--bg-soft) 100%)",
              }}
            >
              <span
                className="pointer-events-none absolute -right-1 -top-4 font-serif text-7xl italic select-none"
                style={{ color: "var(--accent)", opacity: 0.16 }}
              >
                01
              </span>
              <span
                className="stack-divider block"
                style={{ background: "var(--accent)", width: "2.5rem", opacity: 1 }}
              />
              <h3 className="mt-5 font-serif text-xl" style={{ color: "var(--fg)" }}>
                Real projects, not templates
              </h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--fg-soft)" }}>
                Everything here is something I designed and built myself, end to end — not a copied
                template or tutorial clone.
              </p>
            </div>
          </div>

          <div className="reveal reveal-delay-1 card-frame">
            <div
              className="card-inner relative h-full overflow-hidden rounded-2xl border p-7 transition-all duration-300 hover:border-[var(--accent)]"
              style={{
                borderColor: "var(--line)",
                background: "linear-gradient(155deg, var(--surface) 0%, var(--bg-soft) 100%)",
              }}
            >
              <span
                className="pointer-events-none absolute -right-1 -top-4 font-serif text-7xl italic select-none"
                style={{ color: "var(--accent)", opacity: 0.16 }}
              >
                02
              </span>
              <span
                className="stack-divider block"
                style={{ background: "var(--accent)", width: "2.5rem", opacity: 1 }}
              />
              <h3 className="mt-5 font-serif text-xl" style={{ color: "var(--fg)" }}>
                AI-assisted, human-led
              </h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--fg-soft)" }}>
                I use AI tools to move faster and learn deeper — but every decision, debug, and
                design choice is mine.
              </p>
            </div>
          </div>

          <div className="reveal reveal-delay-2 card-frame">
            <div
              className="card-inner relative h-full overflow-hidden rounded-2xl border p-7 transition-all duration-300 hover:border-[var(--accent)]"
              style={{
                borderColor: "var(--line)",
                background: "linear-gradient(155deg, var(--surface) 0%, var(--bg-soft) 100%)",
              }}
            >
              <span
                className="pointer-events-none absolute -right-1 -top-4 font-serif text-7xl italic select-none"
                style={{ color: "var(--accent)", opacity: 0.16 }}
              >
                03
              </span>
              <span
                className="stack-divider block"
                style={{ background: "var(--accent)", width: "2.5rem", opacity: 1 }}
              />
              <h3 className="mt-5 font-serif text-xl" style={{ color: "var(--fg)" }}>
                Direct communication
              </h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--fg-soft)" }}>
                No account managers, no ticket queues — you work directly with me from the first
                message to final delivery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
