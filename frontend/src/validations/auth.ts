// app/validation/auth.ts
import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(2, "Username must be at least 2 characters")
    .max(20, "Username can’t exceed 20 characters"),
  email: z.string().trim().min(1, "Email is required!").email("Invalid Email!"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type RegisterFormInputs = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().trim().min(1, "Email is required!").email("Invalid Email!"),
  password: z.string().min(1, "Password is required!"),
});

export type LoginFormInputs = z.infer<typeof loginSchema>;
