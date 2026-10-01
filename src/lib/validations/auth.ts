import { z } from "zod";

export const startAuthSchema = z.object({
  phoneNumber: z
    .string({
      error: "Phone number is required.",
    })
    .min(7, "Phone number is too short.")
    .max(25, "Phone number is too long."),
  displayName: z
    .string()
    .max(60, "Display name cannot exceed 60 characters.")
    .optional(),
});

export type StartAuthInput = z.infer<typeof startAuthSchema>;

export const verifyAuthSchema = z.object({
  challengeId: z
    .string({
      error: "Challenge ID is required.",
    })
    .uuid("Invalid challenge ID format."),
  code: z
    .string({
      error: "Verification code is required.",
    })
    .regex(/^\d{6}$/, "Verification code must be exactly 6 digits."),
});

export type VerifyAuthInput = z.infer<typeof verifyAuthSchema>;

export const updateUserProfileSchema = z.object({
  displayName: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(60, "Name cannot exceed 60 characters.")
    .optional(),
  email: z
    .string()
    .email("Invalid email format.")
    .optional()
    .nullable(),
});

export type UpdateUserProfileInput = z.infer<typeof updateUserProfileSchema>;
