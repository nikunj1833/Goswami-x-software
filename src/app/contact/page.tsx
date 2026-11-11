import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact RN Developer — Software & App Development Inquiries",
  description:
    "Get in touch with RN Developer to discuss your Android app development, casual game project, Play Store publishing guidance, or custom software requirements.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.rndeveloper.in/contact",
    title: "Contact RN Developer — Software & App Development Inquiries",
    description:
      "Get in touch with RN Developer to discuss your Android app development, casual game project, Play Store publishing guidance, or custom software requirements.",
    siteName: "RN Developer",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact RN Developer — Software & App Development Inquiries",
    description:
      "Get in touch with RN Developer to discuss your Android app development, casual game project, Play Store publishing guidance, or custom software requirements.",
  },
};

export default function ContactPage() {
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
        "name": "Contact",
        "item": "https://www.rndeveloper.in/contact",
      },
    ],
  };

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": "https://www.rndeveloper.in/contact#contactpage",
    "url": "https://www.rndeveloper.in/contact",
    "name": "Contact RN Developer",
    "description":
      "Official contact inquiry page for RN Developer. Submit project requirements and software engineering inquiries.",
    "mainEntity": {
      "@type": "Organization",
      "name": "RN Developer",
      "legalName": "RN SOFTWARE DEVELOPER",
      "url": "https://www.rndeveloper.in",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
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
              Contact RN Developer · Project Inquiries
            </p>
            <h1
              className="mt-3 font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.12]"
              style={{ color: "var(--fg)" }}
            >
              Let&apos;s discuss your software project
            </h1>
            <p className="mt-5 text-base sm:text-lg leading-relaxed max-w-2xl" style={{ color: "var(--fg-soft)" }}>
              Have an Android app idea, casual game project, website requirement, or Google Play Console release
              question? Send your details below. We review every submission and provide direct technical feedback.
            </p>
          </header>

          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            {/* Left Column: Context, Service Inquiries & Information */}
            <div className="space-y-8">
              <section
                className="rounded-2xl border p-6 sm:p-8"
                style={{ backgroundColor: "var(--bg-soft)", borderColor: "var(--line)" }}
              >
                <h2 className="font-serif text-xl sm:text-2xl" style={{ color: "var(--fg)" }}>
                  What You Can Inquire About
                </h2>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed" style={{ color: "var(--fg-soft)" }}>
                  <li className="flex items-start gap-2.5">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                    <div>
                      <strong style={{ color: "var(--fg)" }}>Android &amp; Mobile Apps:</strong> Architecture, UI/UX,
                      Kotlin/React Native engineering, offline caching, and backend API connections.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                    <div>
                      <strong style={{ color: "var(--fg)" }}>Android Game Development:</strong> Casual games, puzzle
                      mechanics, 2D arcade gameplay, sound integration, and touch optimization.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                    <div>
                      <strong style={{ color: "var(--fg)" }}>Play Store Publishing Guidance:</strong> Store listing assets,
                      keystore signing, AAB bundles, policy declarations, and testing tracks.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                    <div>
                      <strong style={{ color: "var(--fg)" }}>Websites &amp; Custom Software:</strong> Next.js websites,
                      internal tools, and business management workflows.
                    </div>
                  </li>
                </ul>
              </section>

              <section
                className="rounded-2xl border p-6 sm:p-8"
                style={{ backgroundColor: "var(--bg-soft)", borderColor: "var(--line)" }}
              >
                <h2 className="font-serif text-lg sm:text-xl" style={{ color: "var(--fg)" }}>
                  What to Expect
                </h2>
                <div className="mt-3 space-y-3 text-xs sm:text-sm leading-relaxed" style={{ color: "var(--fg-soft)" }}>
                  <p>
                    • <strong>Direct Review:</strong> Your message is sent directly to the software developer,
                    not a sales queue.
                  </p>
                  <p>
                    • <strong>Response Time:</strong> Inquiries are typically reviewed within 24–48 business hours.
                  </p>
                  <p>
                    • <strong>Confidentiality:</strong> Your project details and contact information are treated
                    confidentially in accordance with our{" "}
                    <Link href="/privacy-policy" className="underline hover:opacity-80" style={{ color: "var(--accent)" }}>
                      Privacy Policy
                    </Link>.
                  </p>
                </div>
              </section>
            </div>

            {/* Right Column: Contact Form */}
            <div>
              <div
                className="rounded-2xl border p-6 sm:p-8"
                style={{ backgroundColor: "var(--bg-soft)", borderColor: "var(--line)" }}
              >
                <h2 className="font-serif text-2xl" style={{ color: "var(--fg)" }}>
                  Send Your Project Inquiry
                </h2>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed mb-6" style={{ color: "var(--fg-soft)" }}>
                  Fill in your project details below. Fields marked with an asterisk are required.
                </p>

                {/* Existing working ContactForm component with validation and backend API */}
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

