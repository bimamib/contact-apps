import { z } from "zod";

export const contactSchema = z.object({
  id: z.string(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .regex(
      /\+62\s\d{3}[-\.\s]??\d{3}[-\.\s]??\d{3,4}|\(0\d{2,3}\)\s?\d+|0\d{2,3}\s?\d{6,7}|\+62\s?361\s?\d+|\+62\d+|\+62\s?(?:\d{3,}-)*\d{3,5}/,
      "Phone number must be 10-12 digits"
    ),
  address: z.string().min(5, "Address must be at least 5 characters"),
});

export type Contact = z.infer<typeof contactSchema>;
