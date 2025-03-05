import { z } from "zod";

const imageSchema = z.any()
  .optional()
  // .refine(
  //   (file) => !file || file instanceof File, 
  //   "Please upload a valid file"
  // )
  // .refine(
  //   (file) => !file || file.size <= 5 * 1024 * 1024,
  //   "File size must be less than 5MB"
  // );

export const userSettingFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long")
      .max(50, "Name must be at most 50 characters long"),
    email: z.string().min(1).email("Invalid email address"),
    // phonenumber: z.object({
    //   country_code: z
    //     .string()
    //     .min(1)
    //     .regex(/^[A-Z]{2}$/, "Invalid country code"),
    //   number: z
    //     .string()
    //     .min(1)
    //     .regex(
    //       /^\+?\d{1,3}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
    //       "Invalid phone number format"
    //     ),
    // }).optional(),
 
    country_code: z
          .string()
          .min(1)
          .regex(/^[A-Z]{2}$/, "Invalid country code"),
    phone: z.string().min(4, "Phone number must contain atleast 6 characters").max(15).regex(/^\+?\d{1,3}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/, "Invalid phone number format").optional(),
    image: imageSchema.optional(),
});

export type userSettingFormSchemaType = z.infer<typeof userSettingFormSchema>;