"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function ContactForm() {
  const { user } = useAuth();
  const [nameInput, setNameInput] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState<string | null>(null);
  const [projectType, setProjectType] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const name = nameInput !== null ? nameInput : user?.name || "";
  const email = emailInput !== null ? emailInput : user?.email || "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMsg = message.trim();
    const trimmedPhone = phone.trim() || user?.phoneNumber || undefined;

    if (!trimmedName) {
      setFeedback({ type: "error", text: "Please provide your full name." });
      return;
    }

    if (!trimmedEmail) {
      setFeedback({ type: "error", text: "Please provide a valid email address." });
      return;
    }

    if (!trimmedMsg || trimmedMsg.length < 10) {
      setFeedback({ type: "error", text: "Please enter project details of at least 10 characters." });
      return;
    }

    // Format message with optional project type selection without breaking backend contract
    const formattedMessage = projectType
      ? `[Project Type: ${projectType}]\n\n${trimmedMsg}`
      : trimmedMsg;

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          message: formattedMessage,
          phoneNumber: trimmedPhone,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setFeedback({
          type: "error",
          text:
            data.error ||
            "We couldn't securely save your inquiry right now. Please try again later or contact us directly.",
        });
      } else {
        setFeedback({
          type: "success",
          text: data.message || "Thank you for reaching out! Your inquiry has been received.",
        });
        setMessage("");
        setProjectType("");
      }
    } catch {
      setFeedback({
        type: "error",
        text: "Network error. Please check your connection and try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      id="contactForm"
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div>
        <label
          htmlFor="cf-name"
          className="mb-1.5 block text-xs font-mono"
          style={{ color: "var(--fg-soft)" }}
        >
          Full Name <span style={{ color: "var(--accent)" }}>*</span>
        </label>
        <input
          id="cf-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Your full name"
          value={name}
          onChange={(e) => setNameInput(e.target.value)}
          disabled={submitting}
          className="field w-full rounded-lg px-4 py-3 text-sm outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="cf-email"
          className="mb-1.5 block text-xs font-mono"
          style={{ color: "var(--fg-soft)" }}
        >
          Email Address <span style={{ color: "var(--accent)" }}>*</span>
        </label>
        <input
          id="cf-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmailInput(e.target.value)}
          disabled={submitting}
          className="field w-full rounded-lg px-4 py-3 text-sm outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="cf-phone"
          className="mb-1.5 block text-xs font-mono"
          style={{ color: "var(--fg-soft)" }}
        >
          Phone Number <span className="text-[11px] opacity-70">(optional)</span>
        </label>
        <input
          id="cf-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="e.g. +91 98765 43210"
          value={phone || user?.phoneNumber || ""}
          onChange={(e) => setPhone(e.target.value)}
          disabled={submitting}
          className="field w-full rounded-lg px-4 py-3 text-sm outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="cf-project-type"
          className="mb-1.5 block text-xs font-mono"
          style={{ color: "var(--fg-soft)" }}
        >
          Project Type <span className="text-[11px] opacity-70">(optional)</span>
        </label>
        <select
          id="cf-project-type"
          name="projectType"
          value={projectType}
          onChange={(e) => setProjectType(e.target.value)}
          disabled={submitting}
          className="field w-full rounded-lg px-4 py-3 text-sm outline-none cursor-pointer"
          style={{ backgroundColor: "var(--bg-soft)", color: "var(--fg)" }}
        >
          <option value="">Select a project type (optional)</option>
          <option value="Android App Development">Android App Development</option>
          <option value="Mobile App Development">Mobile App Development</option>
          <option value="Game Development">Game Development</option>
          <option value="Google Play Console Publishing">Google Play Console Publishing</option>
          <option value="Website Design & Development">Website Design & Development</option>
          <option value="Custom Software Development">Custom Software Development</option>
          <option value="Other Technical Inquiry">Other Technical Inquiry</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="cf-message"
          className="mb-1.5 block text-xs font-mono"
          style={{ color: "var(--fg-soft)" }}
        >
          Project Details / Message <span style={{ color: "var(--accent)" }}>*</span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={4}
          required
          placeholder="Tell RN Developer about your project requirements, timeline, or questions..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={submitting}
          className="field w-full resize-none rounded-lg px-4 py-3 text-sm outline-none"
        />
      </div>

      {feedback && (
        <p
          id="cf-feedback"
          className="text-xs"
          style={{ color: feedback.type === "success" ? "#4ADE80" : "#E2694A" }}
          role={feedback.type === "error" ? "alert" : "status"}
        >
          {feedback.text}
        </p>
      )}

      <button
        id="cf-submit"
        type="submit"
        disabled={submitting}
        className="btn-primary w-full rounded-full px-6 py-3.5 text-sm font-medium cursor-pointer transition-opacity disabled:opacity-50"
        style={{ color: "var(--bg)" }}
      >
        {submitting ? "Sending inquiry..." : "Send Project Inquiry"}
      </button>

      <p id="cf-note" className="text-center text-xs" style={{ color: "var(--fg-soft)" }}>
        We will review your inquiry and reply to your email address.
      </p>
    </form>
  );
}
