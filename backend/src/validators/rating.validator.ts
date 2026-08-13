import { z } from "zod";

export const submitRatingSchema = z.object({
  storeId: z.string().uuid(),
  value: z.number().int().min(1).max(5),
  comment: z.string().max(500).optional(),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z
    .string()
    .min(8)
    .max(16)
    .regex(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).+$/,
      "Needs one uppercase and one special character",
    ),
});
