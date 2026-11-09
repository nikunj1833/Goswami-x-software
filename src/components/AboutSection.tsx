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
              RN Developer is the public-facing brand of RN SOFTWARE DEVELOPER, a sole proprietorship focused on developing and publishing mobile applications, games, and web-based software.
            </p>
            <p>
              The focus is on practical digital products, reliable software, and user-friendly experiences.
            </p>
          </div>
        </div>

        <div className="reveal reveal-delay-1">
          <h3 className="font-mono text-sm" style={{ color: "var(--accent)" }}>
            Currently
          </h3>
          <p className="mt-4" style={{ color: "var(--fg)" }}>
            Developing and publishing digital products across mobile apps, games, and web-based software.
          </p>

          <h3 className="mt-8 font-mono text-sm" style={{ color: "var(--accent)" }}>
            Business focus
          </h3>
          <p className="mt-4" style={{ color: "var(--fg)" }}>
            App development, game development, web development, and software project inquiries.
          </p>
        </div>
      </div>
    </section>
  );
}
