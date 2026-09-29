export default function FAQSection() {
  const faqs = [
    {
      q: "Are you available for freelance work?",
      a: "Yes — I'm currently open to freelance projects and collaborations, especially around React, React Native, and Firebase.",
      delay: "",
    },
    {
      q: "Do you have professional work experience?",
      a: "I'm self-taught, about 2.5 years in since late 2023, building real projects independently. No formal employment history yet — but every project here is fully working code I built myself.",
      delay: "reveal-delay-1",
    },
    {
      q: "What technologies do you specialize in?",
      a: "React.js and React Native on the frontend, Firebase for backend/auth, and native Android integration with Kotlin, ADB, and Android Studio.",
      delay: "reveal-delay-2",
    },
    {
      q: "Can I see the source code for your projects?",
      a: "Not yet — I'm preparing repos to share publicly. Reach out and I can walk you through any project directly.",
      delay: "reveal-delay-3",
    },
    {
      q: "How can I get in touch?",
      a: "Use the contact form below. My social links are being set up and will go live soon.",
      delay: "",
    },
  ];

  return (
    <section id="faq" className="border-t" style={{ borderColor: "var(--line)" }}>
      <div className="mx-auto max-w-[48rem] px-6 py-20 md:px-10 md:py-28">
        <h2 className="reveal font-serif text-3xl md:text-4xl" style={{ color: "var(--fg)" }}>
          Frequently asked questions
        </h2>
        <p className="reveal mt-4" style={{ color: "var(--fg-soft)" }}>
          Straight answers, no fluff.
        </p>

        <div className="mt-10 space-y-3">
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              className={`faq-item reveal ${faq.delay} rounded-2xl border px-6 py-5`}
              style={{ borderColor: "var(--line)" }}
            >
              <summary
                className="flex items-center justify-between gap-4 font-serif text-lg"
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
      </div>
    </section>
  );
}
