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
              className="card-inner flex flex-col gap-6 p-7 sm:flex-row sm:items-start md:p-9"
              style={{ background: "#FBF7F1" }}
            >
              <span
                className="stack-eyebrow shrink-0 sm:w-40"
                style={{ color: "#B8611F" }}
              >
                Late 2023 — Present
              </span>
              <div>
                <h3 className="font-serif text-2xl" style={{ color: "#3F200D" }}>
                  2.5 years of shipping full-stack products
                </h3>
                <p className="mt-3 max-w-[40rem] text-sm leading-relaxed" style={{ color: "#6E523E" }}>
                  Mobile and web products built end to end — React Native apps with reusable UI,
                  navigation architecture, haptics and smooth transitions, Firebase Auth &amp;
                  Firestore backends, and native Android in Kotlin where the platform demands it.
                  Seven projects, each one working code I can walk you through.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <span
                    className="stack-tag"
                    style={{ borderColor: "#3F200D", color: "#3F200D" }}
                  >
                    React Native
                  </span>
                  <span
                    className="stack-tag"
                    style={{ borderColor: "#3F200D", color: "#3F200D" }}
                  >
                    Kotlin
                  </span>
                  <span
                    className="stack-tag"
                    style={{ borderColor: "#3F200D", color: "#3F200D" }}
                  >
                    Firebase
                  </span>
                  <span
                    className="stack-tag"
                    style={{ borderColor: "#3F200D", color: "#3F200D" }}
                  >
                    React.js
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="reveal reveal-delay-1 card-frame">
            <div
              className="card-inner flex flex-col gap-6 p-7 sm:flex-row sm:items-start md:p-9"
              style={{ background: "linear-gradient(155deg,#4A2A17,#26150A)" }}
            >
              <span
                className="stack-eyebrow shrink-0 sm:w-40"
                style={{ color: "#F0A15A" }}
              >
                What you get
              </span>
              <div>
                <h3 className="font-serif text-2xl" style={{ color: "#FFFFFF" }}>
                  A developer you can trust with the details
                </h3>
                <p className="mt-3 max-w-[40rem] text-sm leading-relaxed" style={{ color: "#E0CDBB" }}>
                  Clean, reusable components instead of throwaway code. Debugging that goes below the
                  console — ADB and Android Studio when a bug lives in the native layer. Clear
                  timelines and direct communication from the first message to handoff, so you
                  always know where your project stands.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <span
                    className="stack-tag"
                    style={{ borderColor: "#F0A15A", color: "#F0A15A" }}
                  >
                    Maintainable code
                  </span>
                  <span
                    className="stack-tag"
                    style={{ borderColor: "#F0A15A", color: "#F0A15A" }}
                  >
                    Native-level debugging
                  </span>
                  <span
                    className="stack-tag"
                    style={{ borderColor: "#F0A15A", color: "#F0A15A" }}
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
