"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function ContactForm() {
  const { user } = useAuth();
  const [nameInput, setNameInput] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const name = nameInput !== null ? nameInput : user?.name || "";
  const email = emailInput !== null ? emailInput : user?.email || "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMsg = message.trim();

    const subject = encodeURIComponent("Project inquiry from " + trimmedName);
    const body = encodeURIComponent(
      trimmedMsg + "\n\n— " + trimmedName + " (" + trimmedEmail + ")"
    );

    window.location.href =
      "mailto:your-email@example.com?subject=" + subject + "&body=" + body;
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
            className="field w-full resize-none rounded-lg px-4 py-3 text-sm outline-none"
          />
        </div>

        <button
          type="submit"
          className="btn-primary w-full rounded-full px-6 py-3 text-sm font-medium"
          style={{ color: "var(--bg)" }}
        >
          Send message
        </button>

        <p id="cf-note" className="text-center text-xs" style={{ color: "var(--fg-soft)" }}>
          Opens your email app with this message pre-filled.
        </p>
      </div>
    </form>
  );
}
