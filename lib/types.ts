import { z } from "zod";

export const contactSchema = z.object({
  id: z.string(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(/^\d{10,12}$/, "Phone number must be 10-12 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
});

export type Contact = z.infer<typeof contactSchema>;
