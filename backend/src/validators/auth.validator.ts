import { z } from "zod";

const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).+$/;

export const signupSchema = z.object({
  name: z
    .string()
    .min(
      20,
      "Please enter your complete full name. If needed, include your middle name so it is at least 20 characters.",
    )
    .max(60, "Please keep your full name within 60 characters."),
  email: z.string().email("Invalid email format"),
  address: z.string().max(400, "Address must be at most 400 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password must be at most 16 characters")
    .regex(
      passwordRegex,
      "Password needs at least one uppercase letter and one special character",
    ),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});
