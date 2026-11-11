import Link from "next/link";

interface ServiceItem {
  number: string;
  title: string;
  description: string;
  features: string[];
  tag: string;
  link: string;
}

const services: ServiceItem[] = [
  {
    number: "01",
    title: "Android App Development",
    description:
      "Native Android (Kotlin) and cross-platform (React Native) mobile applications engineered for stability, offline persistence, and smooth user interaction.",
    features: ["Native Kotlin & React Native", "Offline SQLite/Room caching", "Firebase & RESTful API sync", "Push notifications & background tasks"],
    tag: "Mobile",
    link: "/services#android-app-development",
  },
  {
    number: "02",
    title: "Android Game Development",
    description:
      "Engaging 2D casual and puzzle games for Android with intuitive touch controls, smooth physics, satisfying audio effects, and 60fps performance tuning.",
    features: ["Casual & arcade mechanics", "Touch-optimized controls", "Audio & sound effects integration", "Multi-resolution screen adaptation"],
    tag: "Games",
    link: "/services#game-development",
  },
  {
    number: "03",
    title: "Google Play Store Publishing Support",
    description:
      "Step-by-step technical guidance for Google Play Console release preparation, signed AAB builds, Data Safety declarations, and policy compliance.",
    features: ["Store listing & asset guidance", "Play App Signing & AAB packaging", "Data safety questionnaire assistance", "Internal & closed testing setup"],
    tag: "Store Guidance",
    link: "/services#play-store-support",
  },
  {
    number: "04",
    title: "Website Design & Development",
    description:
      "Modern, fast-loading, responsive business websites and landing pages engineered with Next.js, React, and TypeScript for maximum visibility and performance.",
    features: ["Next.js & TypeScript architecture", "Responsive mobile-first layouts", "SEO, OpenGraph & JSON-LD structured data", "Secure contact forms & spam prevention"],
    tag: "Web",
    link: "/services#website-development",
  },
  {
    number: "05",
    title: "Custom Software & Business Tools",
    description:
      "Bespoke internal web tools, operational dashboards, and database systems built specifically to streamline your business workflows.",
    features: ["Tailored operational workflows", "Role-based authentication", "Database schema & API integrations", "Lightweight code you own completely"],
    tag: "Custom Software",
    link: "/services#custom-software",
  },
  {
    number: "06",
    title: "App Maintenance & Updates",
    description:
      "Dedicated maintenance services including target API level updates to maintain Play Store compliance, bug fixes, performance tuning, and library upgrades.",
    features: ["Android API target level compliance", "Bug resolution & crash diagnostics", "Performance & startup optimization", "Security & dependency updates"],
    tag: "Maintenance",
    link: "/services#app-maintenance",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative overflow-hidden border-t" style={{ borderColor: "var(--line)" }}>
      <div className="glow -right-40 top-1/4 opacity-40" />

      <div className="relative mx-auto max-w-[72rem] px-6 py-20 md:px-10 md:py-28">
        <div className="reveal flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest" style={{ color: "var(--accent)" }}>
              Capabilities &amp; Solutions
            </p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl" style={{ color: "var(--fg)" }}>
              Services we provide
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base leading-relaxed" style={{ color: "var(--fg-soft)" }}>
            Purpose-built software engineering across Android mobile applications, casual games, Play Store readiness, and custom web platforms.
          </p>
        </div>

        {/* Services Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.number}
              className="reveal card-frame rounded-2xl border p-7 flex flex-col justify-between transition-all hover:border-[var(--accent)]"
              style={{
                backgroundColor: "var(--bg-soft)",
                borderColor: "var(--line)",
              }}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider" style={{ color: "var(--accent)" }}>
                    {service.tag}
                  </span>
                  <span className="font-mono text-xs select-none" style={{ color: "var(--fg-soft)" }}>
                    {service.number}
                  </span>
                </div>

                <h3 className="mt-4 font-serif text-xl sm:text-2xl" style={{ color: "var(--fg)" }}>
                  {service.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--fg-soft)" }}>
                  {service.description}
                </p>

                <ul className="mt-5 space-y-2 text-xs border-t pt-4" style={{ borderColor: "var(--line)", color: "var(--fg-soft)" }}>
                  {service.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t flex items-center justify-between" style={{ borderColor: "var(--line)" }}>
                <Link
                  href={service.link}
                  className="inline-flex items-center gap-1.5 text-xs font-mono transition-opacity hover:opacity-75"
                  style={{ color: "var(--accent)" }}
                >
                  Learn details <span aria-hidden="true">→</span>
                </Link>
                <Link
                  href="/contact"
                  className="rounded-full border px-3 py-1 font-mono text-[11px] transition-colors hover:bg-[var(--line)]"
                  style={{ borderColor: "var(--line)", color: "var(--fg)" }}
                >
                  Inquire
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Banner Link to full /services */}
        <div className="reveal mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl border p-6 sm:p-8" style={{ backgroundColor: "var(--surface)", borderColor: "var(--line)" }}>
          <div>
            <h3 className="font-serif text-xl" style={{ color: "var(--fg)" }}>
              Need a comprehensive technical scope or custom bundle?
            </h3>
            <p className="mt-1 text-sm leading-relaxed" style={{ color: "var(--fg-soft)" }}>
              Review our complete deliverables, workflow stages, and Google Play Store transparency disclosures.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <Link
              href="/services"
              className="btn-primary rounded-full px-5 py-2.5 text-xs sm:text-sm font-medium"
              style={{ color: "var(--bg)" }}
            >
              View Full Services Page →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

