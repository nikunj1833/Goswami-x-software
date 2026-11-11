import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About RN Developer — Mobile Apps, Games & Software Development",
  description:
    "Learn about RN Developer (RN SOFTWARE DEVELOPER), our mission, technical capabilities in Android app development, game creation, and custom software solutions.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.rndeveloper.in/about",
    title: "About RN Developer — Mobile Apps, Games & Software Development",
    description:
      "Learn about RN Developer (RN SOFTWARE DEVELOPER), our mission, technical capabilities in Android app development, game creation, and custom software solutions.",
    siteName: "RN Developer",
  },
  twitter: {
    card: "summary_large_image",
    title: "About RN Developer — Mobile Apps, Games & Software Development",
    description:
      "Learn about RN Developer (RN SOFTWARE DEVELOPER), our mission, technical capabilities in Android app development, game creation, and custom software solutions.",
  },
};

export default function AboutPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.rndeveloper.in",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "About",
        "item": "https://www.rndeveloper.in/about",
      },
    ],
  };

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": "https://www.rndeveloper.in/about#aboutpage",
    "url": "https://www.rndeveloper.in/about",
    "name": "About RN Developer",
    "description":
      "Information about RN Developer, an independent software development business specializing in Android apps, games, and web software.",
    "mainEntity": {
      "@type": "Organization",
      "name": "RN Developer",
      "legalName": "RN SOFTWARE DEVELOPER",
      "url": "https://www.rndeveloper.in",
      "description":
        "A sole proprietorship software development business focused on mobile applications, games, and web-based software.",
      "knowsAbout": [
        "Android App Development",
        "Game Development",
        "Mobile App Development",
        "Website Design & Development",
        "Custom Software Development",
        "Kotlin",
        "React Native",
        "Next.js",
        "TypeScript",
        "Firebase",
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />

      <main className="relative z-[2] min-h-screen pt-28 pb-20">
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono transition-opacity hover:opacity-75"
              style={{ color: "var(--accent)" }}
            >
              <span aria-hidden="true">←</span> Back to Home
            </Link>
          </nav>

          {/* Page Header */}
          <header className="mb-14 border-b pb-10" style={{ borderColor: "var(--line)" }}>
            <p className="font-mono text-xs uppercase tracking-widest" style={{ color: "var(--accent)" }}>
              About RN Developer · Software Development Business
            </p>
            <h1
              className="mt-3 font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.12]"
              style={{ color: "var(--fg)" }}
            >
              Building dependable software across mobile, games, and web
            </h1>
            <p className="mt-5 text-base sm:text-lg leading-relaxed max-w-3xl" style={{ color: "var(--fg-soft)" }}>
              RN Developer is the public-facing brand of <strong>RN SOFTWARE DEVELOPER</strong>, an independent
              software engineering business focused on building practical, stable, and user-centric digital products.
            </p>
          </header>

          <div className="space-y-12">
            {/* Overview & Mission */}
            <section
              className="rounded-2xl border p-7 sm:p-10"
              style={{ backgroundColor: "var(--bg-soft)", borderColor: "var(--line)" }}
            >
              <h2 className="font-serif text-2xl sm:text-3xl" style={{ color: "var(--fg)" }}>
                Who We Are &amp; Our Mission
              </h2>
              <div className="mt-4 space-y-4 text-sm sm:text-base leading-relaxed" style={{ color: "var(--fg-soft)" }}>
                <p>
                  RN SOFTWARE DEVELOPER operates as a registered sole proprietorship dedicated to creating bespoke
                  software. In an industry often dominated by bloated agency structures, slow ticket queues, and
                  re-used generic templates, our goal is clear: provide focused, transparent, and direct software
                  engineering.
                </p>
                <p>
                  Our mission is to help individuals, startups, and growing businesses turn their digital concepts into
                  functional, reliable products. Whether building an Android mobile application from scratch, designing
                  an interactive casual game, or engineering a custom web tool, we prioritize clean architecture,
                  responsive design, and long-term maintainability.
                </p>
              </div>
            </section>

            {/* Core Development Capabilities */}
            <section>
              <h2 className="font-serif text-2xl sm:text-3xl" style={{ color: "var(--fg)" }}>
                Core Capabilities
              </h2>
              <p className="mt-2 text-sm sm:text-base" style={{ color: "var(--fg-soft)" }}>
                We specialize in three primary engineering disciplines:
              </p>

              <div className="mt-6 grid gap-6 md:grid-cols-3">
                {/* Capability 1 */}
                <div
                  className="rounded-2xl border p-6 flex flex-col justify-between"
                  style={{ backgroundColor: "var(--bg-soft)", borderColor: "var(--line)" }}
                >
                  <div>
                    <span className="font-mono text-xs uppercase" style={{ color: "var(--accent)" }}>
                      01 · Mobile Apps
                    </span>
                    <h3 className="mt-2 font-serif text-xl" style={{ color: "var(--fg)" }}>
                      Android Application Development
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--fg-soft)" }}>
                      Native Android (Kotlin) and cross-platform (React Native) solutions. We handle UI design,
                      system background tasks, notification handling, local caching (SQLite/Room), secure authentication,
                      and RESTful backend integration.
                    </p>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-1.5 font-mono text-[11px]" style={{ color: "var(--accent)" }}>
                    <span>Kotlin</span> · <span>React Native</span> · <span>Firebase</span>
                  </div>
                </div>

                {/* Capability 2 */}
                <div
                  className="rounded-2xl border p-6 flex flex-col justify-between"
                  style={{ backgroundColor: "var(--bg-soft)", borderColor: "var(--line)" }}
                >
                  <div>
                    <span className="font-mono text-xs uppercase" style={{ color: "var(--accent)" }}>
                      02 · Games
                    </span>
                    <h3 className="mt-2 font-serif text-xl" style={{ color: "var(--fg)" }}>
                      Android Game Development
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--fg-soft)" }}>
                      Engaging casual games, puzzle mechanics, and 2D arcade gameplay tailored for Android. We focus
                      on responsive touch controls, intuitive gameplay loops, and memory optimization for smooth
                      frame rates across diverse screen resolutions.
                    </p>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-1.5 font-mono text-[11px]" style={{ color: "var(--accent)" }}>
                    <span>Casual Games</span> · <span>2D Mechanics</span> · <span>Optimization</span>
                  </div>
                </div>

                {/* Capability 3 */}
                <div
                  className="rounded-2xl border p-6 flex flex-col justify-between"
                  style={{ backgroundColor: "var(--bg-soft)", borderColor: "var(--line)" }}
                >
                  <div>
                    <span className="font-mono text-xs uppercase" style={{ color: "var(--accent)" }}>
                      03 · Web &amp; Tools
                    </span>
                    <h3 className="mt-2 font-serif text-xl" style={{ color: "var(--fg)" }}>
                      Web &amp; Custom Software
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--fg-soft)" }}>
                      Modern websites, responsive landing pages, and business tools built with Next.js, React,
                      and TypeScript. Engineered for performance, security, SEO compliance, and clean responsiveness
                      across mobile and desktop.
                    </p>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-1.5 font-mono text-[11px]" style={{ color: "var(--accent)" }}>
                    <span>Next.js</span> · <span>TypeScript</span> · <span>Tailwind CSS</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Development Approach */}
            <section
              className="rounded-2xl border p-7 sm:p-10"
              style={{ backgroundColor: "var(--bg-soft)", borderColor: "var(--line)" }}
            >
              <h2 className="font-serif text-2xl sm:text-3xl" style={{ color: "var(--fg)" }}>
                Our Development Approach
              </h2>
              <p className="mt-2 text-sm sm:text-base leading-relaxed" style={{ color: "var(--fg-soft)" }}>
                Every project follows a disciplined five-step engineering lifecycle to ensure high code quality,
                adherence to requirements, and predictable delivery:
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                <div className="rounded-xl border p-4" style={{ borderColor: "var(--line)", backgroundColor: "var(--surface)" }}>
                  <span className="font-mono text-xs" style={{ color: "var(--accent)" }}>Step 01</span>
                  <h3 className="mt-1 font-serif text-base font-semibold" style={{ color: "var(--fg)" }}>
                    Discovery &amp; Scope
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed" style={{ color: "var(--fg-soft)" }}>
                    Understanding your target audience, functional requirements, and architecture requirements.
                  </p>
                </div>

                <div className="rounded-xl border p-4" style={{ borderColor: "var(--line)", backgroundColor: "var(--surface)" }}>
                  <span className="font-mono text-xs" style={{ color: "var(--accent)" }}>Step 02</span>
                  <h3 className="mt-1 font-serif text-base font-semibold" style={{ color: "var(--fg)" }}>
                    Design &amp; Layout
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed" style={{ color: "var(--fg-soft)" }}>
                    Structuring user flows, screen states, and responsive component hierarchies.
                  </p>
                </div>

                <div className="rounded-xl border p-4" style={{ borderColor: "var(--line)", backgroundColor: "var(--surface)" }}>
                  <span className="font-mono text-xs" style={{ color: "var(--accent)" }}>Step 03</span>
                  <h3 className="mt-1 font-serif text-base font-semibold" style={{ color: "var(--fg)" }}>
                    Clean Build
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed" style={{ color: "var(--fg-soft)" }}>
                    Handcrafted code implementation with type safety, modular design, and API connections.
                  </p>
                </div>

                <div className="rounded-xl border p-4" style={{ borderColor: "var(--line)", backgroundColor: "var(--surface)" }}>
                  <span className="font-mono text-xs" style={{ color: "var(--accent)" }}>Step 04</span>
                  <h3 className="mt-1 font-serif text-base font-semibold" style={{ color: "var(--fg)" }}>
                    Testing &amp; QA
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed" style={{ color: "var(--fg-soft)" }}>
                    Testing performance, edge cases, responsiveness, and Android system behavior.
                  </p>
                </div>

                <div className="rounded-xl border p-4" style={{ borderColor: "var(--line)", backgroundColor: "var(--surface)" }}>
                  <span className="font-mono text-xs" style={{ color: "var(--accent)" }}>Step 05</span>
                  <h3 className="mt-1 font-serif text-base font-semibold" style={{ color: "var(--fg)" }}>
                    Delivery &amp; Support
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed" style={{ color: "var(--fg-soft)" }}>
                    Production packaging, Play Console setup guidance, and ongoing support.
                  </p>
                </div>
              </div>
            </section>

            {/* Why Work With RN Developer */}
            <section
              className="rounded-2xl border p-7 sm:p-10"
              style={{ backgroundColor: "var(--bg-soft)", borderColor: "var(--line)" }}
            >
              <h2 className="font-serif text-2xl sm:text-3xl" style={{ color: "var(--fg)" }}>
                Why Consider Working With RN Developer
              </h2>

              <ul className="mt-6 space-y-4 text-sm sm:text-base" style={{ color: "var(--fg-soft)" }}>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                  <div>
                    <strong style={{ color: "var(--fg)" }}>Direct Communication:</strong> You work directly with
                    the developer building your software. There are no account managers, third-party middlemen, or
                    miscommunications.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                  <div>
                    <strong style={{ color: "var(--fg)" }}>Tailored, Purpose-Built Solutions:</strong> Every line of
                    code is crafted to meet your specific project goals instead of forcing your vision into rigid
                    commercial templates.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                  <div>
                    <strong style={{ color: "var(--fg)" }}>Honest &amp; Transparent Terms:</strong> Clear scope
                    definitions, realistic delivery milestones, and transparent technical guidance without false
                    promises.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                  <div>
                    <strong style={{ color: "var(--fg)" }}>End-to-End Technical Guidance:</strong> From initial idea
                    and wireframes to APK/AAB release preparation and Google Play Console listing readiness.
                  </div>
                </li>
              </ul>
            </section>

            {/* Call to Action */}
            <section
              className="rounded-2xl border p-8 sm:p-12 text-center"
              style={{
                borderColor: "var(--line)",
                background: "linear-gradient(155deg, var(--bg-soft), var(--surface))",
              }}
            >
              <h2 className="font-serif text-3xl sm:text-4xl" style={{ color: "var(--fg)" }}>
                Ready to discuss your software project?
              </h2>
              <p className="mt-4 text-base sm:text-lg max-w-xl mx-auto" style={{ color: "var(--fg-soft)" }}>
                Whether you need an Android mobile app, casual game, or custom business software, get in touch to discuss
                requirements, scope, and technical implementation.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium"
                  style={{ color: "var(--bg)" }}
                >
                  Start a Project Inquiry
                  <span aria-hidden="true">→</span>
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-colors hover:opacity-100"
                  style={{ borderColor: "var(--line)", color: "var(--fg)" }}
                >
                  Explore Services
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

