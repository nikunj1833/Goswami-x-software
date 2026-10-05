import { z } from "zod";


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
