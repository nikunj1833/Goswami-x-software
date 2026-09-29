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
              className="card-inner relative h-full overflow-hidden p-7"
              style={{ background: "#FBF7F1" }}
            >
              <span
                className="pointer-events-none absolute -right-1 -top-4 font-serif text-7xl italic select-none"
                style={{ color: "#3F200D", opacity: 0.16 }}
              >
                01
              </span>
              <span
                className="stack-divider block"
                style={{ background: "#B8611F", width: "2.5rem", opacity: 1 }}
              />
              <h3 className="mt-5 font-serif text-xl" style={{ color: "#3F200D" }}>
                Real projects, not templates
              </h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "#6E523E" }}>
                Everything here is something I designed and built myself, end to end — not a copied
                template or tutorial clone.
              </p>
            </div>
          </div>

          <div className="reveal reveal-delay-1 card-frame">
            <div
              className="card-inner relative h-full overflow-hidden p-7"
              style={{ background: "linear-gradient(155deg,#4A2A17,#26150A)" }}
            >
              <span
                className="pointer-events-none absolute -right-1 -top-4 font-serif text-7xl italic select-none"
                style={{ color: "#FFFFFF", opacity: 0.16 }}
              >
                02
              </span>
              <span
                className="stack-divider block"
                style={{ background: "#F0A15A", width: "2.5rem", opacity: 1 }}
              />
              <h3 className="mt-5 font-serif text-xl" style={{ color: "#FFFFFF" }}>
                AI-assisted, human-led
              </h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "#E0CDBB" }}>
                I use AI tools to move faster and learn deeper — but every decision, debug, and
                design choice is mine.
              </p>
            </div>
          </div>

          <div className="reveal reveal-delay-2 card-frame">
            <div
              className="card-inner relative h-full overflow-hidden p-7"
              style={{ background: "linear-gradient(155deg,#8F5E3F,#66402A)" }}
            >
              <span
                className="pointer-events-none absolute -right-1 -top-4 font-serif text-7xl italic select-none"
                style={{ color: "#FFFFFF", opacity: 0.16 }}
              >
                03
              </span>
              <span
                className="stack-divider block"
                style={{ background: "#FFD9B0", width: "2.5rem", opacity: 1 }}
              />
              <h3 className="mt-5 font-serif text-xl" style={{ color: "#FFFFFF" }}>
                Direct communication
              </h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "#F3E1D1" }}>
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
