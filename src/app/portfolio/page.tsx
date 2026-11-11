import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Portfolio — Android Apps, Mobile & Web Projects | RN Developer",
  description:
    "Explore verified software projects engineered by RN Developer: Android apps, Kotlin background systems, React Native mobile solutions, and responsive web applications.",
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.rndeveloper.in/portfolio",
    title: "Portfolio — Android Apps, Mobile & Web Projects | RN Developer",
    description:
      "Explore verified software projects engineered by RN Developer: Android apps, Kotlin background systems, React Native mobile solutions, and responsive web applications.",
    siteName: "RN Developer",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio — Android Apps, Mobile & Web Projects | RN Developer",
    description:
      "Explore verified software projects engineered by RN Developer: Android apps, Kotlin background systems, React Native mobile solutions, and responsive web applications.",
  },
};

interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  highlights: string[];
}

const projects: ProjectItem[] = [
  {
    id: "earnpro",
    number: "01",
    title: "EarnPro",
    category: "Mobile Application",
    description:
      "A cross-platform mobile application designed for reward and earning experiences. Engineered with reusable component architecture, smooth navigation flows, haptic feedback integration, and cloud-synced user records.",
    tags: ["React Native", "Firebase", "Mobile UI"],
    highlights: ["Cross-platform mobile architecture", "Cloud authentication & state sync", "Custom touch interactions & haptics"],
  },
  {
    id: "smartalarm",
    number: "02",
    title: "SmartAlarm",
    category: "Native Android App",
    description:
      "A native Android alarm and task utility leveraging Android Kotlin, AlarmManager, and Notifee. Focuses on persistent background execution, reliable system scheduling, foreground notifications, and device power management.",
    tags: ["Kotlin", "Android SDK", "Notifee", "AlarmManager"],
    highlights: ["Native Android system services", "Persistent foreground notifications", "Reliable AlarmManager scheduling"],
  },
  {
    id: "ecommerce-cart",
    number: "03",
    title: "E-Commerce Cart",
    category: "Web Application",
    description:
      "An interactive e-commerce shopping web application. Implements dynamic shopping cart state management, live price and tax calculations, discount code handling, and a clean responsive interface across mobile and desktop viewports.",
    tags: ["React.js", "JavaScript", "State Management"],
    highlights: ["Reactive shopping cart logic", "Responsive checkout UI", "Fast client-side state persistence"],
  },
  {
    id: "employee-management",
    number: "04",
    title: "Employee Management System",
    category: "Business Web Application",
    description:
      "A web-based internal business tool designed for organizing employee records and company team structures. Integrates authenticated access, role-aware user sessions, and real-time database records.",
    tags: ["React.js", "Firebase", "Authentication", "Cloud Database"],
    highlights: ["Role-based access controls", "Real-time database operations", "Employee record management workflow"],
  },
  {
    id: "movie-browser",
    number: "05",
    title: "Movie Browser",
    category: "Web Application",
    description:
      "A responsive movie discovery and exploration web application. Integrates external RESTful media APIs, responsive search and filter mechanisms, and an intuitive grid layout for smooth browsing.",
    tags: ["React.js", "RESTful API", "Responsive Web"],
    highlights: ["External REST API integration", "Instant search and category filtering", "Mobile-optimized media cards"],
  },
  {
    id: "meal-finder",
    number: "06",
    title: "Meal Finder",
    category: "Web Application",
    description:
      "A recipe discovery application built with React. Allows users to query recipes, view step-by-step cooking instructions, inspect detailed ingredient breakdowns, and bookmark favorites with clean user feedback.",
    tags: ["React.js", "Recipe API", "UI Design"],
    highlights: ["Recipe search and query optimization", "Ingredient breakdown modal views", "Clean, accessible user flow"],
  },
  {
    id: "rn-developer-platform",
    number: "07",
    title: "RN Developer Web Platform",
    category: "Web Platform & Architecture",
    description:
      "The official web platform for RN Developer, built with Next.js, TypeScript, and Tailwind CSS. Features full multi-page SEO optimization, dark/light theme persistence, secure serverless contact workflows, and accessible responsive design.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "SEO Architecture"],
    highlights: ["Complete Next.js App Router multi-page SEO", "Zero layout shift theme persistence", "Custom serverless contact API"],
  },
];

export default function PortfolioPage() {
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
        "name": "Portfolio",
        "item": "https://www.rndeveloper.in/portfolio",
      },
    ],
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://www.rndeveloper.in/portfolio#collectionpage",
    "url": "https://www.rndeveloper.in/portfolio",
    "name": "RN Developer Portfolio — Selected Software Projects",
    "description":
      "Verified software engineering projects by RN Developer across Android applications, Kotlin utilities, and web software.",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": projects.map((p, index) => ({
        "@type": "SoftwareApplication",
        "position": index + 1,
        "name": p.title,
        "applicationCategory": p.category,
        "description": p.description,
      })),
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
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
              Selected Work · Engineering Portfolio
            </p>
            <h1
              className="mt-3 font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.12]"
              style={{ color: "var(--fg)" }}
            >
              Verified software, mobile apps &amp; web projects
            </h1>
            <p className="mt-5 text-base sm:text-lg leading-relaxed max-w-3xl" style={{ color: "var(--fg-soft)" }}>
              A curated look at software solutions we have engineered. Each project reflects genuine code,
              practical architecture, and attention to performance—built without copied templates.
            </p>
          </header>

          {/* Projects Grid */}
          <div className="grid gap-8 md:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.id}
                className="rounded-2xl border p-7 sm:p-8 flex flex-col justify-between transition-all"
                style={{
                  backgroundColor: "var(--bg-soft)",
                  borderColor: "var(--line)",
                }}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-wider" style={{ color: "var(--accent)" }}>
                      {project.category}
                    </span>
                    <span className="font-mono text-xs select-none" style={{ color: "var(--fg-soft)" }}>
                      {project.number}
                    </span>
                  </div>

                  <h2 className="mt-3 font-serif text-2xl sm:text-3xl" style={{ color: "var(--fg)" }}>
                    {project.title}
                  </h2>

                  <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--fg-soft)" }}>
                    {project.description}
                  </p>

                  <div className="mt-5 border-t pt-4" style={{ borderColor: "var(--line)" }}>
                    <h3 className="font-mono text-[11px] uppercase tracking-wider" style={{ color: "var(--accent)" }}>
                      Technical Highlights
                    </h3>
                    <ul className="mt-2 space-y-1.5 text-xs" style={{ color: "var(--fg-soft)" }}>
                      {project.highlights.map((h, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t flex flex-wrap gap-2" style={{ borderColor: "var(--line)" }}>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border px-2.5 py-0.5 font-mono text-[11px]"
                      style={{ borderColor: "var(--line)", color: "var(--fg-soft)", backgroundColor: "var(--surface)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          {/* Transparent Notice */}
          <section
            className="mt-12 rounded-2xl border p-6 text-xs sm:text-sm leading-relaxed"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--line)",
              color: "var(--fg-soft)",
            }}
          >
            <strong style={{ color: "var(--fg)" }}>Transparency in Our Work:</strong> We present only real,
            independently engineered software solutions. We do not display fabricated client logos, fake revenue
            metrics, or falsified ratings. If you would like to inspect technical architecture details or discuss
            a bespoke build for your business, we welcome inquiries.
          </section>

          {/* Bottom CTA */}
          <section
            className="mt-12 rounded-2xl border p-8 sm:p-12 text-center"
            style={{
              borderColor: "var(--line)",
              background: "linear-gradient(155deg, var(--bg-soft), var(--surface))",
            }}
          >
            <h2 className="font-serif text-3xl sm:text-4xl" style={{ color: "var(--fg)" }}>
              Have an app, game, or software idea?
            </h2>
            <p className="mt-4 text-base sm:text-lg max-w-xl mx-auto" style={{ color: "var(--fg-soft)" }}>
              From concept validation to clean execution, let&apos;s build software that performs.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium"
                style={{ color: "var(--bg)" }}
              >
                Discuss a Project
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-colors hover:opacity-100"
                style={{ borderColor: "var(--line)", color: "var(--fg)" }}
              >
                View Services &amp; Capabilities
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

