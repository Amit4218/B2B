import { z } from "zod";

export const AuthSchema = z.object({
  email: z.email("Please enter a valid email address..."),
  password: z.string().min(6, "Password must be atleast 6 characters long"),
});
