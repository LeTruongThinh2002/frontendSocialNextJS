import { z } from "zod";

const resetPasswordSchema = z
  .object({
    token: z.string(),
    email: z.string(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." })
      .max(255, { message: "Password must be at most 255 characters" }),
    password_confirmation: z
      .string()
      .min(8, { message: "Confirm password must be at least 8 characters." })
      .max(255, { message: "Confirm password must be at most 255 characters" }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
  });

export default resetPasswordSchema;
