export default function ComparisonSection() {
  return (
    <section className="border-t" style={{ borderColor: "var(--line)" }}>
      <div className="mx-auto max-w-[72rem] px-6 py-20 md:px-10 md:py-28">
        <h2 className="reveal font-serif text-3xl md:text-4xl" style={{ color: "var(--fg)" }}>
          What sets RN Developer apart
        </h2>
        <p className="reveal mt-4 max-w-[38rem]" style={{ color: "var(--fg-soft)" }}>
          A practical, product-focused approach to software development.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="reveal card-frame">
            <div className="card-inner h-full p-7">
              <p className="font-mono text-xs uppercase" style={{ color: "var(--accent)" }}>
                Working with RN Developer
              </p>
              <ul className="mt-4 space-y-3 text-sm" style={{ color: "var(--fg)" }}>
                <li className="compare-yes">Real, working projects you can walk through</li>
                <li className="compare-yes">Direct project communication</li>
                <li className="compare-yes">Clear scope and project updates</li>
                <li className="compare-yes">Focused on practical solutions</li>
                <li className="compare-yes">Transparent, fair pricing</li>
              </ul>
            </div>
          </div>

          <div className="reveal reveal-delay-1 card-frame">
            <div className="card-inner h-full p-7">
              <p className="font-mono text-xs uppercase" style={{ color: "var(--fg-soft)" }}>
                The usual way
              </p>
              <ul className="mt-4 space-y-3 text-sm" style={{ color: "var(--fg-soft)" }}>
                <li className="compare-no">Portfolios padded with tutorial clones</li>
                <li className="compare-no">Passed between account managers</li>
                <li className="compare-no">Inflated job titles and years</li>
                <li className="compare-no">Static, outdated skillset</li>
                <li className="compare-no">Hidden fees and scope creep</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
