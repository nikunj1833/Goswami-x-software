export default function FAQSection() {
  const faqs = [
    {
      q: "What services does RN Developer offer?",
      a: "RN Developer focuses on mobile app development, game development, web development, and software solutions.",
      delay: "",
    },
    {
      q: "What kind of products does RN Developer build?",
      a: "The business develops and publishes mobile applications, games, and web-based software. Product details can be added to the website as they become available.",
      delay: "reveal-delay-1",
    },
    {
      q: "What technologies do you specialize in?",
      a: "React.js and React Native on the frontend, Firebase for backend/auth, and native Android integration with Kotlin, ADB, and Android Studio.",
      delay: "reveal-delay-2",
    },
    {
      q: "Where can I find your apps and games?",
      a: "Product and store links will be added here when they are ready for public release.",
      delay: "reveal-delay-3",
    },
    {
      q: "How can I get in touch?",
      a: "Use the contact form below. Business contact and social links will be added when available.",
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
