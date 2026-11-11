import Link from "next/link";
import ContactForm from "./ContactForm";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t"
      style={{
        borderColor: "var(--line)",
        backgroundColor: "rgba(var(--bg-soft-rgb),0.93)",
      }}
    >
      <div className="glow -right-40 top-0 opacity-60" />

      <div className="relative mx-auto max-w-[72rem] px-6 py-20 md:px-10 md:py-28">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest" style={{ color: "var(--accent)" }}>
              Start a Conversation · Direct Developer Inquiries
            </p>
            <h2
              className="reveal mt-3 max-w-lg font-serif text-3xl leading-tight md:text-5xl"
              style={{ color: "var(--fg)" }}
            >
              Have a project in mind? RN Developer would like to hear about it.
            </h2>
            <p
              className="reveal reveal-delay-1 mt-6 max-w-md text-base leading-relaxed"
              style={{ color: "var(--fg-soft)" }}
            >
              Whether you need an Android application, casual game, website, or Google Play Console publishing assistance,
              use the form to send your project details. We review every inquiry and provide straightforward technical feedback.
            </p>

            <div className="reveal reveal-delay-2 mt-8 space-y-4">
              <div className="flex items-start gap-3 rounded-xl border p-4" style={{ backgroundColor: "var(--surface)", borderColor: "var(--line)" }}>
                <span className="text-lg select-none">💬</span>
                <div>
                  <h3 className="font-serif text-sm font-semibold" style={{ color: "var(--fg)" }}>
                    Direct Developer Communication
                  </h3>
                  <p className="mt-0.5 text-xs leading-relaxed" style={{ color: "var(--fg-soft)" }}>
                    You communicate directly with the engineer building your product, not an account manager.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border p-4" style={{ backgroundColor: "var(--surface)", borderColor: "var(--line)" }}>
                <span className="text-lg select-none">⚡</span>
                <div>
                  <h3 className="font-serif text-sm font-semibold" style={{ color: "var(--fg)" }}>
                    Fast Review &amp; Realistic Scope
                  </h3>
                  <p className="mt-0.5 text-xs leading-relaxed" style={{ color: "var(--fg-soft)" }}>
                    Inquiries are typically reviewed within 24–48 hours with honest scope and milestone estimates.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border p-4" style={{ backgroundColor: "var(--surface)", borderColor: "var(--line)" }}>
                <span className="text-lg select-none">🔒</span>
                <div>
                  <h3 className="font-serif text-sm font-semibold" style={{ color: "var(--fg)" }}>
                    Confidential &amp; Secure
                  </h3>
                  <p className="mt-0.5 text-xs leading-relaxed" style={{ color: "var(--fg-soft)" }}>
                    Your project details and contact information are treated strictly confidentially under our{" "}
                    <Link href="/privacy-policy" className="underline hover:opacity-80" style={{ color: "var(--accent)" }}>
                      Privacy Policy
                    </Link>.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4 text-xs font-mono" style={{ color: "var(--fg-soft)" }}>
              <span>Learn more on our</span>
              <Link href="/contact" className="underline hover:opacity-80" style={{ color: "var(--accent)" }}>
                Dedicated Contact Page →
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border p-6 sm:p-8" style={{ backgroundColor: "var(--surface)", borderColor: "var(--line)" }}>
            <h3 className="font-serif text-2xl" style={{ color: "var(--fg)" }}>
              Send a Project Message
            </h3>
            <p className="mt-1 text-xs sm:text-sm leading-relaxed mb-6" style={{ color: "var(--fg-soft)" }}>
              Provide your name, email, and project details. We will respond promptly.
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
