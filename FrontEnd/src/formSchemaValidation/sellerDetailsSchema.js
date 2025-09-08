import { z } from "zod";

export const sellerDetailsSchema = z.object({
  city: z.string().min(3, "Please enter a valid city name"),
  state: z.string().min(3, "Please enter a valid state name"),
  gst_number: z.string().min(15, "Please enter a valid 'GST' number"),
  description: z
    .string()
    .min(10, "Description should be atleast 10 characters long")
    .max(60, "Description cannot be more the 60 characters"),
});
