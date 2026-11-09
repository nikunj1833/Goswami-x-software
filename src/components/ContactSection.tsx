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
            <h2
              className="reveal max-w-lg font-serif text-3xl leading-tight md:text-5xl"
              style={{ color: "var(--fg)" }}
            >
              Have a project in mind? RN Developer would like to hear about it.
            </h2>
            <p
              className="reveal reveal-delay-1 mt-6 max-w-sm"
              style={{ color: "var(--fg-soft)" }}
            >
              Use the form to send a project or business inquiry to RN Developer.
            </p>
            <ul
              className="reveal reveal-delay-2 mt-8 flex flex-wrap gap-6 text-sm"
              style={{ color: "var(--fg-soft)" }}
            />
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
