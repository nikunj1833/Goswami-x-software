import { z } from "zod";

/**
 * Strips HTML tags and script-like elements to sanitize input text
 */
export function sanitizeText(input: string): string {
  if (!input) return "";
  return input
    .replace(/<[^>]*>?/gm, "") // Strip HTML tags
    .replace(/[<>'"&]/g, (char) => {
      switch (char) {
        case "<":
          return "&lt;";
        case ">":
          return "&gt;";
        case "'":
          return "&#39;";
        case '"':
          return "&quot;";
        case "&":
          return "&amp;";
        default:
          return char;
      }
    })
    .trim();
}

export const contactFormSchema = z.object({
  name: z
    .string({
      error: "Name is required.",
    })
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name cannot exceed 100 characters.")
    .transform(sanitizeText),
  email: z
    .string({
      error: "Email is required.",
    })
    .email("Please provide a valid email address.")
    .max(150, "Email cannot exceed 150 characters.")
    .toLowerCase()
    .trim(),
  message: z
    .string({
      error: "Message is required.",
    })
    .min(10, "Message must be at least 10 characters.")
    .max(3000, "Message cannot exceed 3000 characters.")
    .transform(sanitizeText),
  phoneNumber: z
    .string()
    .max(30, "Phone number is too long.")
    .optional(),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
