import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — Goswami X Software",
  description:
    "Terms of Service governing the use of Goswami X Software website, project demonstrations, and software engineering services.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p className="mt-4 text-base sm:text-lg leading-relaxed" style={{ color: "var(--fg-soft)" }}>
            These Terms of Service outline the terms and conditions governing the use of the Goswami X Software
            website, software demonstrations, and development engagements.
          </p>
        </header>

        {/* Terms Content Sections */}
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
              1. Acceptance of Terms
            </h2>
            <p className="mt-3">
              By accessing or using this website (<strong>Goswami X Software</strong>, operated by{" "}
              <strong>Nikunj Giri</strong>), you agree to these Terms of Service and our{" "}
              <Link href="/privacy-policy" className="underline hover:opacity-80" style={{ color: "var(--accent)" }}>
                Privacy Policy
              </Link>
              . If you do not agree to these terms, please do not use this site or its associated services.
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
              2. Software Development Engagements
            </h2>
            <p className="mt-3">
              Goswami X Software provides independent full-stack web and mobile development services.
              For bespoke consulting or client development projects:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                Project scope, deliverables, delivery timelines, and compensation are defined in separate
                written proposals, agreements, or statements of work agreed upon with each client.
              </li>
              <li>
                Project milestones and deliverables are reviewed and accepted according to the mutually
                agreed project specifications.
              </li>
            </ul>
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
              3. User Accounts & Session Security
            </h2>
            <p className="mt-3">
              When using authentication features facilitated by Google OAuth and Supabase Auth:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                You are responsible for maintaining the security of your Google account and active browser session.
              </li>
              <li>
                You agree to notify us promptly if you discover or suspect unauthorized access to your account.
              </li>
              <li>
                We reserve the right to revoke session access or suspend accounts that engage in malicious,
                abusive, or disruptive activities.
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
              4. Intellectual Property
            </h2>
            <div className="mt-4 space-y-4">
              <div>
                <h3 className="font-medium" style={{ color: "var(--fg)" }}>
                  A. Website Content & Branding
                </h3>
                <p className="mt-1">
                  The Goswami X Software brand name, website design, text content, and demonstration code
                  showcased on this portfolio are the intellectual property of Nikunj Giri or their respective
                  licensors.
                </p>
              </div>

              <div>
                <h3 className="font-medium" style={{ color: "var(--fg)" }}>
                  B. Client Deliverables
                </h3>
                <p className="mt-1">
                  For bespoke client work, ownership and licensing of custom deliverables, application code,
                  and assets are governed by the specific written contract established for each engagement.
                </p>
              </div>
            </div>
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
              5. Acceptable Use
            </h2>
            <p className="mt-3">
              You agree to use this website and any associated API endpoints responsibly. You must not:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Transmit automated spam, abusive messages, or unauthorized promotional content via contact forms.</li>
              <li>Attempt to bypass authentication mechanisms, rate limits, or security controls.</li>
              <li>Launch denial-of-service attacks or perform automated scraping that degrades service performance.</li>
              <li>Distribute malware, malicious payloads, or harmful code through our forms or endpoints.</li>
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
              6. Disclaimers & Limitation of Liability
            </h2>
            <p className="mt-3">
              This website and its demonstration features are provided on an &ldquo;as is&rdquo; and
              &ldquo;as available&rdquo; basis without warranties of any kind, whether express or implied,
              including but not limited to implied warranties of merchantability, fitness for a particular
              purpose, or non-infringement.
            </p>
            <p className="mt-3">
              To the fullest extent permitted by applicable law, Goswami X Software and Nikunj Giri shall not
              be liable for any indirect, incidental, special, or consequential damages resulting from your use
              of or inability to use this website or demonstration services.
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
              7. Agreement Terms & Modifications
            </h2>
            <p className="mt-3">
              These Terms apply to website browsing and general inquiries. Specific terms for commercial
              consulting or custom development agreements will be detailed in individual project agreements.
            </p>
            <p className="mt-3">
              We reserve the right to revise these Terms of Service periodically to reflect changes in our
              services or practices. The effective date at the top will indicate when the latest revisions took effect.
            </p>
          </section>

          {/* Section 8 */}
          <section
            className="rounded-2xl border p-6 sm:p-8"
            style={{
              backgroundColor: "var(--bg-soft)",
              borderColor: "var(--line)",
            }}
          >
            <h2 className="font-serif text-xl sm:text-2xl" style={{ color: "var(--fg)" }}>
              8. Contact
            </h2>
            <p className="mt-3">
              For any questions, project inquiries, or legal clarifications regarding these Terms, please reach out
              via our contact form:
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
                href="/privacy-policy"
                className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-xs font-medium transition-colors hover:opacity-100"
                style={{ borderColor: "var(--line)", color: "var(--fg)" }}
              >
                Privacy Policy
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
