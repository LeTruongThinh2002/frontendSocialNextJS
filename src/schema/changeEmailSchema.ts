import { z } from "zod";

const changeEmailSchema = z.object({
  newEmail: z
    .string()
    .min(2, { message: "Email must be at least 2 characters." })
    .max(255, { message: "Email must be at most 255 characters" })
    .email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(2, { message: "Password must be at least 2 characters." })
    .max(255, { message: "Password must be at most 255 characters" }),
});

export default changeEmailSchema;
