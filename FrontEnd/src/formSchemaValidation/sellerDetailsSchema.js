import { z } from "zod";

export const sellerDetailsSchema = z.object({
  city: z.string().min(3, "Please enter a valid city name").optional(),
  state: z.string().min(3, "Please enter a valid state name").optional(),
  gst_number: z
    .string()
    .min(15, "Please enter a valid GST number (15 characters)")
    .max(15, "GST number should be exactly 15 characters")
    .optional(),
  description: z
    .string()
    .min(10, "Description should be at least 10 characters long")
    .max(200, "Description cannot be more than 500 characters")
    .optional(),
});
