import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services — Android Apps, Game Development & Software | RN Developer",
  description:
    "Explore software development services by RN Developer: Android app development, mobile apps, casual games, Play Store publishing guidance, websites, and custom tools.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.rndeveloper.in/services",
    title: "Services — Android Apps, Game Development & Software | RN Developer",
    description:
      "Explore software development services by RN Developer: Android app development, mobile apps, casual games, Play Store publishing guidance, websites, and custom tools.",
    siteName: "RN Developer",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services — Android Apps, Game Development & Software | RN Developer",
    description:
      "Explore software development services by RN Developer: Android app development, mobile apps, casual games, Play Store publishing guidance, websites, and custom tools.",
  },
};

export default function ServicesPage() {
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
        "name": "Services",
        "item": "https://www.rndeveloper.in/services",
      },
    ],
  };

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "Service",
        "position": 1,
        "name": "Android App Development",
        "description": "Custom Android mobile application engineering using Kotlin and React Native, including UI/UX, backend integration, and release preparation.",
        "provider": {
          "@type": "Organization",
          "name": "RN Developer",
          "url": "https://www.rndeveloper.in",
        },
      },
      {
        "@type": "Service",
        "position": 2,
        "name": "Android Game Development",
        "description": "Casual 2D game development for Android with intuitive touch controls, engaging gameplay mechanics, and device performance optimization.",
        "provider": {
          "@type": "Organization",
          "name": "RN Developer",
          "url": "https://www.rndeveloper.in",
        },
      },
      {
        "@type": "Service",
        "position": 3,
        "name": "Google Play Store Publishing Support",
        "description": "Technical guidance and preparation for Google Play Console listing, keystore app signing, policy compliance, and bundle verification.",
        "provider": {
          "@type": "Organization",
          "name": "RN Developer",
          "url": "https://www.rndeveloper.in",
        },
      },
      {
        "@type": "Service",
        "position": 4,
        "name": "Website Design & Development",
        "description": "Modern responsive business websites, landing pages, and web applications built with Next.js, React, and TypeScript.",
        "provider": {
          "@type": "Organization",
          "name": "RN Developer",
          "url": "https://www.rndeveloper.in",
        },
      },
      {
        "@type": "Service",
        "position": 5,
        "name": "Custom Software Development",
        "description": "Tailored internal business tools, web systems, and API integrations engineered for operational workflows.",
        "provider": {
          "@type": "Organization",
          "name": "RN Developer",
          "url": "https://www.rndeveloper.in",
        },
      },
      {
        "@type": "Service",
        "position": 6,
        "name": "App Maintenance & Updates",
        "description": "Ongoing bug fixes, OS compatibility updates, performance tuning, and dependency updates for mobile and web apps.",
        "provider": {
          "@type": "Organization",
          "name": "RN Developer",
          "url": "https://www.rndeveloper.in",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
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
              Services · Engineering &amp; Development
            </p>
            <h1
              className="mt-3 font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.12]"
              style={{ color: "var(--fg)" }}
            >
              Software development services tailored to your goals
            </h1>
            <p className="mt-5 text-base sm:text-lg leading-relaxed max-w-3xl" style={{ color: "var(--fg-soft)" }}>
              From initial Android app engineering and casual games to custom web platforms and Google Play Console release preparation,
              RN Developer provides end-to-end technical execution with direct communication and transparent delivery.
            </p>
          </header>

          {/* Services Stack */}
          <div className="space-y-12">
            {/* Service A: Android App Development */}
            <article
              id="android-app-development"
              className="rounded-2xl border p-7 sm:p-10 transition-colors"
              style={{ backgroundColor: "var(--bg-soft)", borderColor: "var(--line)" }}
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="font-mono text-xs uppercase tracking-wider" style={{ color: "var(--accent)" }}>
                  Service 01 · Mobile Solutions
                </span>
                <span className="rounded-full border px-3 py-1 font-mono text-[11px]" style={{ borderColor: "var(--line)", color: "var(--fg-soft)" }}>
                  Kotlin · React Native
                </span>
              </div>

              <h2 className="mt-3 font-serif text-2xl sm:text-3xl" style={{ color: "var(--fg)" }}>
                Android &amp; Mobile App Development
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed" style={{ color: "var(--fg-soft)" }}>
                We build performant, stable Android mobile applications suited for individuals, startups, and businesses.
                Whether you need a dedicated native Android app built with Kotlin or a cross-platform mobile solution
                using React Native, each project is crafted with modern design patterns and reliable system integrations.
              </p>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-wider" style={{ color: "var(--accent)" }}>
                    Key Capabilities &amp; Benefits
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm" style={{ color: "var(--fg-soft)" }}>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                      Responsive, touch-friendly UI/UX built for varying screen dimensions.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                      Local offline caching using SQLite and Room persistence.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                      Secure authentication (OAuth, Firebase Auth, email/phone verification).
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                      RESTful backend API connections and real-time cloud data sync.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                      Native system background tasks, services, and push notifications.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-mono text-xs uppercase tracking-wider" style={{ color: "var(--accent)" }}>
                    Deliverables
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm" style={{ color: "var(--fg-soft)" }}>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                      Complete, well-structured Android source code repository.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                      Signed production APK and optimized Android App Bundle (AAB).
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                      Testing logs across representative physical Android devices.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                      Setup documentation for backend services and environment variables.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-7 flex items-center justify-between border-t pt-5" style={{ borderColor: "var(--line)" }}>
                <span className="text-xs font-mono" style={{ color: "var(--fg-soft)" }}>
                  Native Kotlin · Cross-Platform React Native
                </span>
                <Link
                  href="/contact"
                  className="btn-primary inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-medium"
                  style={{ color: "var(--bg)" }}
                >
                  Inquire About Android Apps
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>

            {/* Service B: Game Development */}
            <article
              id="game-development"
              className="rounded-2xl border p-7 sm:p-10 transition-colors"
              style={{ backgroundColor: "var(--bg-soft)", borderColor: "var(--line)" }}
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="font-mono text-xs uppercase tracking-wider" style={{ color: "var(--accent)" }}>
                  Service 02 · Interactive Entertainment
                </span>
                <span className="rounded-full border px-3 py-1 font-mono text-[11px]" style={{ borderColor: "var(--line)", color: "var(--fg-soft)" }}>
                  Casual &amp; Arcade Games
                </span>
              </div>

              <h2 className="mt-3 font-serif text-2xl sm:text-3xl" style={{ color: "var(--fg)" }}>
                Android Game Development
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed" style={{ color: "var(--fg-soft)" }}>
                We design and engineer lightweight, responsive Android casual games, puzzle mechanics, and 2D arcade gameplay.
                The focus is on engaging player mechanics, intuitive touch controls, sound effects integration, and high frame-rate
                performance that runs smoothly across budget, mid-range, and flagship Android devices.
              </p>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-wider" style={{ color: "var(--accent)" }}>
                    Key Capabilities &amp; Benefits
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm" style={{ color: "var(--fg-soft)" }}>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                      Engaging core gameplay loops designed for mobile touch interaction.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                      Performance and memory optimization to prevent lag or battery drain.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                      Score tracking, local high score storage, and progress saving.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                      Audio integration for background tracks and satisfying tactile sound effects.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-mono text-xs uppercase tracking-wider" style={{ color: "var(--accent)" }}>
                    Deliverables
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm" style={{ color: "var(--fg-soft)" }}>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                      Complete game project source code and assets.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                      Production Android App Bundle ready for Play Store submission.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                      Optimized resolution handling across portrait and landscape aspect ratios.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-7 flex items-center justify-between border-t pt-5" style={{ borderColor: "var(--line)" }}>
                <span className="text-xs font-mono" style={{ color: "var(--fg-soft)" }}>
                  2D Gameplay · Performance Focused
                </span>
                <Link
                  href="/contact"
                  className="btn-primary inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-medium"
                  style={{ color: "var(--bg)" }}
                >
                  Inquire About Game Development
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>

            {/* Service C: Google Play Store Publishing Support */}
            <article
              id="play-store-support"
              className="rounded-2xl border p-7 sm:p-10 transition-colors"
              style={{ backgroundColor: "var(--bg-soft)", borderColor: "var(--line)" }}
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="font-mono text-xs uppercase tracking-wider" style={{ color: "var(--accent)" }}>
                  Service 03 · Store Readiness
                </span>
                <span className="rounded-full border px-3 py-1 font-mono text-[11px]" style={{ borderColor: "var(--line)", color: "var(--fg-soft)" }}>
                  Google Play Console
                </span>
              </div>

              <h2 className="mt-3 font-serif text-2xl sm:text-3xl" style={{ color: "var(--fg)" }}>
                Google Play Store Publishing Support &amp; Console Guidance
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed" style={{ color: "var(--fg-soft)" }}>
                Navigating the technical release process for the Google Play Store can be complex. We provide technical
                preparation and step-by-step guidance for developers and business owners seeking to release their Android
                apps and games properly on the Google Play Console.
              </p>

              {/* Explicit Independence Notice */}
              <div
                className="mt-5 rounded-xl border p-4 text-xs sm:text-sm leading-relaxed"
                style={{
                  backgroundColor: "var(--surface)",
                  borderColor: "var(--line)",
                  color: "var(--fg-soft)",
                }}
              >
                <strong style={{ color: "var(--fg)" }}>Important Transparency Notice:</strong> Google LLC independently
                reviews and controls all Google Play Store approval, review timelines, and publishing decisions according
                to their Developer Program Policies. RN Developer provides technical preparation, asset validation, and
                procedural guidance. We do not claim official Google affiliation, Google partnership, or guaranteed store approval.
              </div>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-wider" style={{ color: "var(--accent)" }}>
                    Guidance Areas
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm" style={{ color: "var(--fg-soft)" }}>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                      Store listing preparation: Title, short description, full description formatting.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                      Store graphic asset specifications (App icon 512x512, Feature Graphic 1024x500, screenshots).
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                      Play App Signing, upload keystore generation, and AAB verification.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                      Policy questionnaires: Data Safety declarations, Target Audience, Content Ratings.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                      Release track guidance (Internal, Closed testing track, and Production rollout).
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-mono text-xs uppercase tracking-wider" style={{ color: "var(--accent)" }}>
                    Deliverables
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm" style={{ color: "var(--fg-soft)" }}>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                      Play Console-compliant Android App Bundle (AAB).
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                      Data Safety and Privacy Policy documentation alignment.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                      Step-by-step checklist for release submission.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-7 flex items-center justify-between border-t pt-5" style={{ borderColor: "var(--line)" }}>
                <span className="text-xs font-mono" style={{ color: "var(--fg-soft)" }}>
                  Technical Guidance · Policy Compliance
                </span>
                <Link
                  href="/contact"
                  className="btn-primary inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-medium"
                  style={{ color: "var(--bg)" }}
                >
                  Request Publishing Guidance
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>

            {/* Service D: Website Design & Development */}
            <article
              id="website-development"
              className="rounded-2xl border p-7 sm:p-10 transition-colors"
              style={{ backgroundColor: "var(--bg-soft)", borderColor: "var(--line)" }}
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="font-mono text-xs uppercase tracking-wider" style={{ color: "var(--accent)" }}>
                  Service 04 · Web Solutions
                </span>
                <span className="rounded-full border px-3 py-1 font-mono text-[11px]" style={{ borderColor: "var(--line)", color: "var(--fg-soft)" }}>
                  Next.js · TypeScript
                </span>
              </div>

              <h2 className="mt-3 font-serif text-2xl sm:text-3xl" style={{ color: "var(--fg)" }}>
                Website Design &amp; Development
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed" style={{ color: "var(--fg-soft)" }}>
                We build modern, fast, and SEO-compliant websites for businesses, creators, and products.
                Using Next.js, React, and TypeScript, we develop tailored web presences that load quickly, look sharp
                on all screen resolutions, and provide clean user interaction.
              </p>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-wider" style={{ color: "var(--accent)" }}>
                    Key Capabilities &amp; Benefits
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm" style={{ color: "var(--fg-soft)" }}>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                      Business websites, landing pages, and service portfolios.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                      Mobile-first responsive layouts with clean typography and dark/light mode options.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                      Search engine optimization: Semantic HTML, Open Graph tags, JSON-LD structured data, and XML sitemaps.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                      Contact forms, spam prevention, and email/WhatsApp notification hooks.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-mono text-xs uppercase tracking-wider" style={{ color: "var(--accent)" }}>
                    Deliverables
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm" style={{ color: "var(--fg-soft)" }}>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                      Production-ready Next.js codebase.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                      Domain configuration and cloud deployment setup.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                      Verified sitemap and robots.txt configuration.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-7 flex items-center justify-between border-t pt-5" style={{ borderColor: "var(--line)" }}>
                <span className="text-xs font-mono" style={{ color: "var(--fg-soft)" }}>
                  Responsive · Fast · SEO-Optimized
                </span>
                <Link
                  href="/contact"
                  className="btn-primary inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-medium"
                  style={{ color: "var(--bg)" }}
                >
                  Inquire About Websites
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>

            {/* Service E: Custom Software Development */}
            <article
              id="custom-software"
              className="rounded-2xl border p-7 sm:p-10 transition-colors"
              style={{ backgroundColor: "var(--bg-soft)", borderColor: "var(--line)" }}
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="font-mono text-xs uppercase tracking-wider" style={{ color: "var(--accent)" }}>
                  Service 05 · Custom Tools
                </span>
                <span className="rounded-full border px-3 py-1 font-mono text-[11px]" style={{ borderColor: "var(--line)", color: "var(--fg-soft)" }}>
                  Business Applications
                </span>
              </div>

              <h2 className="mt-3 font-serif text-2xl sm:text-3xl" style={{ color: "var(--fg)" }}>
                Custom Software &amp; Business Applications
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed" style={{ color: "var(--fg-soft)" }}>
                When standard commercial tools don&apos;t fit your operational needs, custom software provides the answer.
                We engineer bespoke internal management tools, database interfaces, and workflow web applications
                built specifically for your business processes without unnecessary SaaS recurring fees.
              </p>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-wider" style={{ color: "var(--accent)" }}>
                    Key Capabilities &amp; Benefits
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm" style={{ color: "var(--fg-soft)" }}>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                      Custom operational workflows, record management, and data tracking.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                      Role-based access controls and secure authentication.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                      Database schema design and API integrations with existing third-party services.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                      Lightweight, maintainable codebases you own completely.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-mono text-xs uppercase tracking-wider" style={{ color: "var(--accent)" }}>
                    Deliverables
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm" style={{ color: "var(--fg-soft)" }}>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                      Fully documented web application and source code.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                      Secure environment variables and credential setup.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                      Deployment to your preferred hosting provider.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-7 flex items-center justify-between border-t pt-5" style={{ borderColor: "var(--line)" }}>
                <span className="text-xs font-mono" style={{ color: "var(--fg-soft)" }}>
                  Tailored Workflows · Full Code Ownership
                </span>
                <Link
                  href="/contact"
                  className="btn-primary inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-medium"
                  style={{ color: "var(--bg)" }}
                >
                  Inquire About Custom Software
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>

            {/* Service F: App Maintenance & Updates */}
            <article
              id="app-maintenance"
              className="rounded-2xl border p-7 sm:p-10 transition-colors"
              style={{ backgroundColor: "var(--bg-soft)", borderColor: "var(--line)" }}
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="font-mono text-xs uppercase tracking-wider" style={{ color: "var(--accent)" }}>
                  Service 06 · Lifecycle Support
                </span>
                <span className="rounded-full border px-3 py-1 font-mono text-[11px]" style={{ borderColor: "var(--line)", color: "var(--fg-soft)" }}>
                  Updates &amp; Bug Fixes
                </span>
              </div>

              <h2 className="mt-3 font-serif text-2xl sm:text-3xl" style={{ color: "var(--fg)" }}>
                App Maintenance, Bug Fixes &amp; Updates
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed" style={{ color: "var(--fg-soft)" }}>
                Software requires ongoing attention as mobile operating systems, Android API target levels, dependencies,
                and user needs evolve. We provide dedicated maintenance services to keep your existing Android apps and web
                systems running securely and reliably.
              </p>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-wider" style={{ color: "var(--accent)" }}>
                    Key Capabilities &amp; Benefits
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm" style={{ color: "var(--fg-soft)" }}>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                      Android API level updates to maintain Google Play target compliance.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                      Crash diagnosis, bug fixes, and exception handling improvements.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                      Performance tuning and app startup optimization.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                      Dependency and security vulnerability updates.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-mono text-xs uppercase tracking-wider" style={{ color: "var(--accent)" }}>
                    Deliverables
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm" style={{ color: "var(--fg-soft)" }}>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                      Targeted patch releases and updated signed AABs.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                      Detailed changelog outlining resolved issues and code updates.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                      Verification testing prior to production rollout.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-7 flex items-center justify-between border-t pt-5" style={{ borderColor: "var(--line)" }}>
                <span className="text-xs font-mono" style={{ color: "var(--fg-soft)" }}>
                  Target API Updates · Bug Resolution
                </span>
                <Link
                  href="/contact"
                  className="btn-primary inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-medium"
                  style={{ color: "var(--bg)" }}
                >
                  Inquire About Maintenance
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          </div>

          {/* Bottom CTA */}
          <section
            className="mt-14 rounded-2xl border p-8 sm:p-12 text-center"
            style={{
              borderColor: "var(--line)",
              background: "linear-gradient(155deg, var(--bg-soft), var(--surface))",
            }}
          >
            <h2 className="font-serif text-3xl sm:text-4xl" style={{ color: "var(--fg)" }}>
              Need a tailored software solution?
            </h2>
            <p className="mt-4 text-base sm:text-lg max-w-xl mx-auto" style={{ color: "var(--fg-soft)" }}>
              Tell us about your project requirements, target platform, and expected timeline. We will review your inquiry
              and provide straightforward technical feedback.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium"
                style={{ color: "var(--bg)" }}
              >
                Discuss Your Requirements
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-colors hover:opacity-100"
                style={{ borderColor: "var(--line)", color: "var(--fg)" }}
              >
                View Selected Work
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
