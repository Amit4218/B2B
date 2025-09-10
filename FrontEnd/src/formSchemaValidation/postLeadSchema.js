import { z } from "zod";

export const requirementSchema = z.object({
  product_title: z.string().min(1, "Product title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  image: z.string().url("Image upload failed, please try again"),
  quantity_needed: z.coerce
    .number()
    .int()
    .positive("Quantity must be greater than 0"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  delivery_location: z.string().min(1, "Delivery location is required"),
});
