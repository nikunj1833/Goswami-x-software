import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Goswami X Software",
  description:
    "Privacy Policy for Goswami X Software and Nikunj Giri. Understand how we collect, store, and protect your information.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="relative z-[2] min-h-screen pt-28 pb-20">
      <div className="mx-auto max-w-4xl px-6 md:px-10">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono transition-opacity hover:opacity-75"
            style={{ color: "var(--accent)" }}
          >
            <span aria-hidden="true">←</span> Back to Home
          </Link>
        </div>

        {/* Page Header */}
        <header className="mb-12 border-b pb-8" style={{ borderColor: "var(--line)" }}>
          <p className="font-mono text-xs uppercase tracking-widest" style={{ color: "var(--accent)" }}>
            Legal Documentation · Effective October 2026
          </p>
          <h1
            className="mt-3 font-serif text-4xl sm:text-5xl tracking-tight"
            style={{ color: "var(--fg)" }}
          >
            Privacy Policy
          </h1>
          <p className="mt-4 text-base sm:text-lg leading-relaxed" style={{ color: "var(--fg-soft)" }}>
            At Goswami X Software, transparency and privacy are fundamental. This document explains
            what data is collected, how it is used, and how your information is handled when using this
            website.
          </p>
        </header>

        {/* Policy Content Sections */}
        <div className="space-y-10 text-sm leading-relaxed" style={{ color: "var(--fg-soft)" }}>
          {/* Section 1 */}
          <section
            className="rounded-2xl border p-6 sm:p-8"
            style={{
              backgroundColor: "var(--bg-soft)",
              borderColor: "var(--line)",
            }}
          >
            <h2 className="font-serif text-xl sm:text-2xl" style={{ color: "var(--fg)" }}>
              1. Overview & Scope
            </h2>
            <p className="mt-3">
              This Privacy Policy applies to <strong>Goswami X Software</strong>, an independent software
              engineering and portfolio website maintained by <strong>Nikunj Giri</strong>. This policy
              details our privacy practices regarding visitors, account holders, and project inquiries.
            </p>
          </section>

          {/* Section 2 */}
          <section
            className="rounded-2xl border p-6 sm:p-8"
            style={{
              backgroundColor: "var(--bg-soft)",
              borderColor: "var(--line)",
            }}
          >
            <h2 className="font-serif text-xl sm:text-2xl" style={{ color: "var(--fg)" }}>
              2. Information We Collect
            </h2>
            <div className="mt-4 space-y-4">
              <div>
                <h3 className="font-medium" style={{ color: "var(--fg)" }}>
                  A. Authentication Data (Google OAuth via Supabase)
                </h3>
                <p className="mt-1">
                  When you sign in using Google OAuth, authentication is handled through Supabase Auth.
                  We receive basic account information provided by Google, including your verified email
                  address, name, and profile picture URL. We never have access to or store your Google password.
                </p>
              </div>

              <div>
                <h3 className="font-medium" style={{ color: "var(--fg)" }}>
                  B. Contact Inquiries
                </h3>
                <p className="mt-1">
                  When you submit an inquiry through our contact form, we collect the details you provide:
                  your name, email address, optional phone/WhatsApp number, and project message.
                </p>
              </div>

              <div>
                <h3 className="font-medium" style={{ color: "var(--fg)" }}>
                  C. Server & Technical Metrics
                </h3>
                <p className="mt-1">
                  When making requests to our site and API routes, technical metadata such as client IP
                  address, browser user-agent, and request timestamps are processed to enforce rate limiting,
                  prevent spam, and maintain service availability.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section
            className="rounded-2xl border p-6 sm:p-8"
            style={{
              backgroundColor: "var(--bg-soft)",
              borderColor: "var(--line)",
            }}
          >
            <h2 className="font-serif text-xl sm:text-2xl" style={{ color: "var(--fg)" }}>
              3. Cookies & Local Session Storage
            </h2>
            <p className="mt-3">
              We only use essential functional storage required for the website to operate correctly:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <strong>Authentication Cookies:</strong> Secure session cookies managed by Supabase Auth
                to keep you signed in across page navigation and reloads.
              </li>
              <li>
                <strong>Theme Preference:</strong> A local storage entry (<code>ng-theme</code>) used to
                remember your dark/light mode preference.
              </li>
              <li>
                <strong>No Tracking or Advertising Cookies:</strong> We do not use third-party advertising
                trackers, marketing cookies, or cross-site tracking technologies.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section
            className="rounded-2xl border p-6 sm:p-8"
            style={{
              backgroundColor: "var(--bg-soft)",
              borderColor: "var(--line)",
            }}
          >
            <h2 className="font-serif text-xl sm:text-2xl" style={{ color: "var(--fg)" }}>
              4. How We Use Information
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>To authenticate your identity and maintain your active session.</li>
              <li>To review, respond to, and communicate regarding project inquiries and software requests.</li>
              <li>To prevent automated abuse, spam, and denial-of-service attempts via rate-limiting mechanisms.</li>
              <li>We do not sell, rent, or monetize your personal information to third parties.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section
            className="rounded-2xl border p-6 sm:p-8"
            style={{
              backgroundColor: "var(--bg-soft)",
              borderColor: "var(--line)",
            }}
          >
            <h2 className="font-serif text-xl sm:text-2xl" style={{ color: "var(--fg)" }}>
              5. Data Storage, Security & Infrastructure
            </h2>
            <p className="mt-3">
              We rely on established modern development infrastructure to safeguard your information:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <strong>Encryption in Transit:</strong> Traffic is transmitted over standard HTTPS,
                protecting data exchange between your browser and our servers.
              </li>
              <li>
                <strong>Supabase:</strong> Provides managed cloud database storage and authentication services.
                Access to user profiles is constrained to authenticated user sessions.
              </li>
              <li>
                <strong>Google Identity Services:</strong> Facilitates OAuth 2.0 authentication verification.
              </li>
              <li>
                <strong>Hosting:</strong> Application deployment and serverless execution are hosted on cloud
                infrastructure (such as Vercel).
              </li>
            </ul>
          </section>

          {/* Section 6 */}
          <section
            className="rounded-2xl border p-6 sm:p-8"
            style={{
              backgroundColor: "var(--bg-soft)",
              borderColor: "var(--line)",
            }}
          >
            <h2 className="font-serif text-xl sm:text-2xl" style={{ color: "var(--fg)" }}>
              6. Data Retention & Your Rights
            </h2>
            <p className="mt-3">
              Account data and contact submissions are kept only as long as necessary for active communications,
              project management, and service operations.
            </p>
            <p className="mt-3">
              You may request an update to your profile, a summary of your stored information, or full deletion
              of your account and associated records at any time by contacting us directly through the contact
              form.
            </p>
          </section>

          {/* Section 7 */}
          <section
            className="rounded-2xl border p-6 sm:p-8"
            style={{
              backgroundColor: "var(--bg-soft)",
              borderColor: "var(--line)",
            }}
          >
            <h2 className="font-serif text-xl sm:text-2xl" style={{ color: "var(--fg)" }}>
              7. Contact & Inquiries
            </h2>
            <p className="mt-3">
              If you have any questions about this Privacy Policy or wish to request data updates or removal,
              please reach out:
            </p>
            <div className="mt-4 flex flex-wrap gap-4">
              <Link
                href="/#contact"
                className="btn-primary inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-medium"
                style={{ color: "var(--bg)" }}
              >
                Contact Form
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/terms"
                className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-xs font-medium transition-colors hover:opacity-100"
                style={{ borderColor: "var(--line)", color: "var(--fg)" }}
              >
                Terms of Service
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
