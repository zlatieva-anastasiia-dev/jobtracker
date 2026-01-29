import z from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters long."),
});

export const SignUpSchema = z
  .object({
    email: z
      .string()
      .trim()
      .min(1, "Email is required.")
      .email("Invalid email address."),
    password: z.string().min(6, "Password must be at least 6 characters long."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const ResetPasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters long."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });
