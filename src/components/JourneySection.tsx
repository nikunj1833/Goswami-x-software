export default function JourneySection() {
  return (
    <section
      id="experience"
      className="relative overflow-hidden border-t"
      style={{ borderColor: "var(--line)" }}
    >
      <div className="glow -right-40 bottom-0 opacity-50" />

      <div className="relative mx-auto max-w-[72rem] px-6 py-20 md:px-10 md:py-28">
        <h2 className="reveal font-serif text-3xl md:text-4xl" style={{ color: "var(--fg)" }}>
          Journey
        </h2>
        <p className="reveal mt-4 max-w-[38rem]" style={{ color: "var(--fg-soft)" }}>
          2.5 years of building and shipping real software.
        </p>

        <div className="mt-12 space-y-6">
          <div className="reveal card-frame">
            <div
              className="card-inner flex flex-col gap-6 rounded-2xl border p-7 sm:flex-row sm:items-start md:p-9 transition-all duration-300 hover:border-[var(--accent)]"
              style={{
                borderColor: "var(--line)",
                background: "linear-gradient(155deg, var(--surface) 0%, var(--bg-soft) 100%)",
              }}
            >
              <span
                className="stack-eyebrow shrink-0 sm:w-40 font-mono text-xs uppercase tracking-wider"
                style={{ color: "var(--accent)" }}
              >
                Late 2023 — Present
              </span>
              <div>
                <h3 className="font-serif text-2xl" style={{ color: "var(--fg)" }}>
                  2.5 years of shipping full-stack products
                </h3>
                <p className="mt-3 max-w-[40rem] text-sm leading-relaxed" style={{ color: "var(--fg-soft)" }}>
                  Mobile and web products built end to end — React Native apps with reusable UI,
                  navigation architecture, haptics and smooth transitions, Firebase Auth &amp;
                  Firestore backends, and native Android in Kotlin where the platform demands it.
                  Seven projects, each one working code I can walk you through.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <span
                    className="stack-tag"
                    style={{ borderColor: "var(--line)", color: "var(--fg-soft)", backgroundColor: "var(--bg-soft)" }}
                  >
                    React Native
                  </span>
                  <span
                    className="stack-tag"
                    style={{ borderColor: "var(--line)", color: "var(--fg-soft)", backgroundColor: "var(--bg-soft)" }}
                  >
                    Kotlin
                  </span>
                  <span
                    className="stack-tag"
                    style={{ borderColor: "var(--line)", color: "var(--fg-soft)", backgroundColor: "var(--bg-soft)" }}
                  >
                    Firebase
                  </span>
                  <span
                    className="stack-tag"
                    style={{ borderColor: "var(--line)", color: "var(--fg-soft)", backgroundColor: "var(--bg-soft)" }}
                  >
                    React.js
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="reveal reveal-delay-1 card-frame">
            <div
              className="card-inner flex flex-col gap-6 rounded-2xl border p-7 sm:flex-row sm:items-start md:p-9 transition-all duration-300 hover:border-[var(--accent)]"
              style={{
                borderColor: "var(--line)",
                background: "linear-gradient(155deg, var(--surface) 0%, var(--bg-soft) 100%)",
              }}
            >
              <span
                className="stack-eyebrow shrink-0 sm:w-40 font-mono text-xs uppercase tracking-wider"
                style={{ color: "var(--accent)" }}
              >
                What you get
              </span>
              <div>
                <h3 className="font-serif text-2xl" style={{ color: "var(--fg)" }}>
                  A developer you can trust with the details
                </h3>
                <p className="mt-3 max-w-[40rem] text-sm leading-relaxed" style={{ color: "var(--fg-soft)" }}>
                  Clean, reusable components instead of throwaway code. Debugging that goes below the
                  console — ADB and Android Studio when a bug lives in the native layer. Clear
                  timelines and direct communication from the first message to handoff, so you
                  always know where your project stands.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <span
                    className="stack-tag"
                    style={{ borderColor: "var(--line)", color: "var(--fg-soft)", backgroundColor: "var(--bg-soft)" }}
                  >
                    Maintainable code
                  </span>
                  <span
                    className="stack-tag"
                    style={{ borderColor: "var(--line)", color: "var(--fg-soft)", backgroundColor: "var(--bg-soft)" }}
                  >
                    Native-level debugging
                  </span>
                  <span
                    className="stack-tag"
                    style={{ borderColor: "var(--line)", color: "var(--fg-soft)", backgroundColor: "var(--bg-soft)" }}
                  >
                    Direct communication
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
