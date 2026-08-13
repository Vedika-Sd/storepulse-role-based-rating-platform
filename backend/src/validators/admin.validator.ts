import { z } from "zod";

const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).+$/;
const nameSchema = z.string().min(20).max(60);
const addressSchema = z.string().max(400);
const passwordSchema = z.string().min(8).max(16).regex(passwordRegex);

export const createUserSchema = z.object({
  name: nameSchema,
  email: z.string().email(),
  address: addressSchema,
  password: passwordSchema,
  role: z.enum(["ADMIN", "NORMAL_USER"]),
});

export const createStoreSchema = z.object({
  storeName: z.string().min(1).max(60),
  storeEmail: z.string().email(),
  storeAddress: addressSchema,
  ownerName: nameSchema,
  ownerEmail: z.string().email(),
  ownerPassword: passwordSchema,
});

export const listQuerySchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  address: z.string().optional(),
  role: z.string().optional(),
  sortBy: z.string().optional().default("createdAt"),
  order: z.enum(["asc", "desc"]).optional().default("asc"),
});
