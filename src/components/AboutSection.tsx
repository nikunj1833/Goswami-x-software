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
          <h2 className="font-serif text-3xl md:text-4xl" style={{ color: "var(--fg)" }}>
            About
          </h2>
          <div
            className="mt-8 max-w-[38rem] space-y-5 text-lg leading-relaxed"
            style={{ color: "var(--fg-soft)" }}
          >
            <p>
              I&apos;m Nikunj Giri, a self-taught full-stack developer — about 2.5 years in, since late
              2023, building real projects instead of tutorials. React.js on web, React Native and
              native Android on mobile.
            </p>
            <p>
              I use AI-assisted workflows to move faster, and I care about shipping things that
              actually work.
            </p>
          </div>
        </div>

        <div className="reveal reveal-delay-1">
          <h3 className="font-mono text-sm" style={{ color: "var(--accent)" }}>
            Currently
          </h3>
          <p className="mt-4" style={{ color: "var(--fg)" }}>
            Building and shipping personal projects — from React Native apps to React-based web
            tools — to sharpen my skills as a full-stack developer.
          </p>

          <h3 className="mt-8 font-mono text-sm" style={{ color: "var(--accent)" }}>
            Open to
          </h3>
          <p className="mt-4" style={{ color: "var(--fg)" }}>
            Freelance work, collaborations, and opportunities to learn and build alongside other
            developers.
          </p>
        </div>
      </div>
    </section>
  );
}
