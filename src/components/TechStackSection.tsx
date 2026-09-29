const row1Items = [
  "HTML5",
  "CSS3",
  "JavaScript (ES6+)",
  "TypeScript",
  "React.js",
  "React Native",
  "Firebase Auth & Firestore",
];

const row2Items = [
  "React Navigation",
  "Android Studio",
  "ADB",
  "Kotlin",
  "Notifee",
  "Git & GitHub",
  "AI-Assisted Development",
];

export default function TechStackSection() {
  return (
    <section id="stack" className="border-t" style={{ borderColor: "var(--line)" }}>
      <div className="mx-auto max-w-[72rem] px-6 pt-20 md:px-10 md:pt-28">
        <h2 className="reveal font-serif text-3xl md:text-4xl" style={{ color: "var(--fg)" }}>
          Tech stack
        </h2>
        <p className="reveal mt-4 max-w-[38rem]" style={{ color: "var(--fg-soft)" }}>
          Tools I reach for to take a product from idea to a live, working app.
        </p>
      </div>

      <div className="reveal marquee-row marquee-mask mt-12 overflow-hidden py-3">
        <div className="marquee-track">
          {[...row1Items, ...row1Items].map((item, index) => (
            <span
              key={`row1-${index}`}
              className="glass-chip flex items-center gap-3 rounded-2xl px-6 py-4 font-serif text-lg"
              style={{ color: "var(--fg)" }}
            >
              <span style={{ color: "var(--accent)" }}>●</span>
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="reveal reveal-delay-1 marquee-row marquee-mask mt-4 overflow-hidden py-3">
        <div className="marquee-track marquee-track-reverse">
          {[...row2Items, ...row2Items].map((item, index) => (
            <span
              key={`row2-${index}`}
              className="glass-chip flex items-center gap-3 rounded-2xl px-6 py-4 font-serif text-lg"
              style={{ color: "var(--fg)" }}
            >
              <span style={{ color: "var(--accent-soft)" }}>●</span>
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="pb-20 md:pb-28" />
    </section>
  );
}
