import { z } from "zod";
const registerSchema = z
  .object({
    first_name: z
      .string()
      .max(255, { message: "First name must be at most 255 characters." })
      .min(1, { message: "First name must be at least 1 character." }),
    last_name: z
      .string()
      .max(255, { message: "Last name must be at most 255 characters." })
      .min(1, { message: "Last name must be at least 1 character." }),
    email: z
      .string()
      .max(255, { message: "Email must be at most 255 characters." })
      .email({ message: "Invalid email address." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    confirm_password: z
      .string()
      .min(8, { message: "Confirm password must be at least 8 characters." }),
    date_of_birth: z.date({ message: "Invalid date of birth" }),
    country: z
      .string()
      .min(1, { message: "Please enter a valid country" })
      .max(255, { message: "Country must be at most 255 characters" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Confirm password doesn't match",
    path: ["confirm_password"],
  });

export default registerSchema;
