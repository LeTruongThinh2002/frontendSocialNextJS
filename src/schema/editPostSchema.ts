import { z } from "zod";

const editPostSchema = z.object({
  description: z
    .string()
    .min(2, { message: "Description must be at least 2 characters." })
    .max(255, { message: "Description must be at most 255 characters" }),
});

export default editPostSchema;
