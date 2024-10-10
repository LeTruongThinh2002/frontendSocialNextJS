import { z } from "zod";

const editProfileSchema = z.object({
  first_name: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." })
    .max(255, { message: "First name must be at most 255 characters" }),
  last_name: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." })
    .max(255, { message: "Last name must be at most 255 characters" }),
  avatar: z.string(),
  background: z.string(),
  date_of_birth: z.string().date(),
  country: z
    .string()
    .min(2, { message: "Country must be at least 2 characters." })
    .max(255, { message: "Country must be at most 255 characters" }),
});

export default editProfileSchema;
