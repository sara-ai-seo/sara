import { z } from "zod";

export const contactFormSchema = z.object({
  firstname: z
    .string()
    .min(2, "First name must be at least 2 characters long"),
  lastname: z.string().min(2, "Last name must be at least 2 characters long"),
  email: z.string().min(1).email("Invalid email address"),
  phonenumber: z.object({
    country_code: z
      .string()
      .min(1)
      .regex(/^[A-Z]{2}$/, "Invalid country code"),
    number: z
      .string()
      .min(1)
      .regex(
        /^\+?\d{1,3}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
        "Invalid phone number format"
      ),
  }),
  message: z.string().min(10, "Message must be at least 10 characters long"),
  privacy_policy: z.boolean().refine((val) => val === true, {
    message: "You must agree to the privacy policy",
  }),
});

export type contactFormSchemaType = z.infer<typeof contactFormSchema>;
