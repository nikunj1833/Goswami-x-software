"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function ContactForm() {
  const { user } = useAuth();
  const [nameInput, setNameInput] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState<string | null>(null);
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
      setFeedback({ type: "error", text: "Please provide your name." });
      return;
    }

    if (!trimmedEmail) {
      setFeedback({ type: "error", text: "Please provide a valid email address." });
      return;
    }

    if (!trimmedMsg || trimmedMsg.length < 10) {
      setFeedback({ type: "error", text: "Please enter a message of at least 10 characters." });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMsg,
          phoneNumber: trimmedPhone,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setFeedback({
          type: "error",
          text: data.error || "Failed to submit inquiry. Please try again.",
        });
      } else {
        setFeedback({
          type: "success",
          text: data.message || "Thank you for reaching out! Your message has been sent successfully.",
        });
        setMessage("");
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
      className="reveal reveal-delay-2 card-frame"
    >
      <div className="card-inner space-y-4 p-7">
        <div>
          <label
            htmlFor="cf-name"
            className="mb-1.5 block text-xs font-mono"
            style={{ color: "var(--fg-soft)" }}
          >
            Name
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            placeholder="Your name"
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
            Email
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
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
            Phone / WhatsApp <span className="text-[11px] opacity-70">(optional)</span>
          </label>
          <input
            id="cf-phone"
            name="phone"
            type="tel"
            placeholder="+91 98765 43210"
            value={phone || user?.phoneNumber || ""}
            onChange={(e) => setPhone(e.target.value)}
            disabled={submitting}
            className="field w-full rounded-lg px-4 py-3 text-sm outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="cf-message"
            className="mb-1.5 block text-xs font-mono"
            style={{ color: "var(--fg-soft)" }}
          >
            Message
          </label>
          <textarea
            id="cf-message"
            name="message"
            rows={4}
            required
            placeholder="Tell me about your project"
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
          className="btn-primary w-full rounded-full px-6 py-3 text-sm font-medium cursor-pointer transition-opacity disabled:opacity-50"
          style={{ color: "var(--bg)" }}
        >
          {submitting ? "Sending message..." : "Send message"}
        </button>

        <p id="cf-note" className="text-center text-xs" style={{ color: "var(--fg-soft)" }}>
          Direct communication with Nikunj Giri. Responses within 24 hours.
        </p>
      </div>
    </form>
  );
}
