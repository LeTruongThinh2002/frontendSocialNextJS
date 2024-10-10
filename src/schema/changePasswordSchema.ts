import { z } from "zod";

const changePasswordSchema = z
  .object({
    password: z
      .string()
      .min(2, { message: "Password must be at least 2 characters." })
      .max(255, { message: "Password must be at most 255 characters" }),
    newPassword: z
      .string()
      .min(2, { message: "New password must be at least 2 characters." })
      .max(255, { message: "New password must be at most 255 characters" }),
    confirmNewPassword: z
      .string()
      .min(2, {
        message: "Confirm new password must be at least 2 characters.",
      })
      .max(255, {
        message: "Confirm new password must be at most 255 characters",
      }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Confirm new password doesn't match",
    path: ["confirmNewPassword"],
  });

export default changePasswordSchema;
