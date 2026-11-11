import Link from "next/link";

export default function FAQSection() {
  const faqs = [
    {
      q: "What software services does RN Developer provide?",
      a: "RN Developer specializes in Android mobile application development (native Kotlin and cross-platform React Native), casual 2D Android game creation, Google Play Store publishing guidance and Console setup, responsive website development (Next.js & TypeScript), custom business workflow software, and ongoing app maintenance.",
      delay: "",
    },
    {
      q: "How does Google Play Store publishing assistance work?",
      a: "We guide creators and businesses through the technical release process: generating signed Android App Bundles (AABs), formatting store graphic assets, answering Google Play Console policy questionnaires (Data Safety, content ratings), and configuring testing tracks. Please note that Google LLC independently reviews and controls all Play Store approval decisions; we provide technical preparation and guidance.",
      delay: "reveal-delay-1",
    },
    {
      q: "What technologies and architecture do you use?",
      a: "For mobile, we use Kotlin, Android Studio, ADB, and React Native. For web and cloud platforms, we engineer with Next.js, React.js, TypeScript, and Tailwind CSS. For backend and data persistence, we integrate Firebase, cloud databases, RESTful APIs, and local SQLite/Room storage.",
      delay: "reveal-delay-2",
    },
    {
      q: "Can you maintain, update, or fix bugs in an existing app?",
      a: "Yes. We offer maintenance services including target API level updates to maintain Play Store policy compliance, bug resolution, crash diagnostics, performance tuning, and library/dependency upgrades.",
      delay: "reveal-delay-3",
    },
    {
      q: "How do project scoping, milestones, and communication work?",
      a: "We work directly with you—there are no account managers or ticket queues. We begin with a discovery phase to define functional requirements, establish clear milestone deliverables, and provide regular progress updates from initial build to final delivery.",
      delay: "",
    },
    {
      q: "How do I get started or discuss a project inquiry?",
      a: "You can submit an inquiry through our contact form below or on our dedicated contact page. Provide your requirements, target platforms, and timeline. Inquiries are reviewed directly by the developer within 24–48 business hours.",
      delay: "reveal-delay-1",
    },
  ];

  return (
    <section id="faq" className="border-t" style={{ borderColor: "var(--line)" }}>
      <div className="mx-auto max-w-[52rem] px-6 py-20 md:px-10 md:py-28">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-widest" style={{ color: "var(--accent)" }}>
            Questions &amp; Clarity
          </p>
          <h2 className="reveal mt-3 font-serif text-3xl sm:text-4xl" style={{ color: "var(--fg)" }}>
            Frequently asked questions
          </h2>
          <p className="reveal mt-4 text-sm sm:text-base leading-relaxed" style={{ color: "var(--fg-soft)" }}>
            Straightforward answers about our development capabilities, publishing guidance, and project terms.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              className={`faq-item reveal ${faq.delay} rounded-2xl border px-6 py-5`}
              style={{ borderColor: "var(--line)", backgroundColor: "var(--bg-soft)" }}
            >
              <summary
                className="flex items-center justify-between gap-4 font-serif text-lg cursor-pointer"
                style={{ color: "var(--fg)" }}
              >
                {faq.q}
                <span className="faq-icon font-mono text-xl" style={{ color: "var(--accent)" }}>
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--fg-soft)" }}>
                {faq.a}
              </p>
            </details>
          ))}
        </div>

        <div className="mt-10 text-center text-xs font-mono" style={{ color: "var(--fg-soft)" }}>
          <span>Have a question not listed here? </span>
          <Link href="/contact" className="underline hover:opacity-80" style={{ color: "var(--accent)" }}>
            Reach out via our Contact Page →
          </Link>
        </div>
      </div>
    </section>
  );
}
