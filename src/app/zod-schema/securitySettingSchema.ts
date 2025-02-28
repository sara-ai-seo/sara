import {z} from 'zod';

const isStrongPassword = (password: string): boolean => {
    const hasNumber = /\d/.test(password); // Check for at least one number
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password); // Check for at least one special character
    return password.length >= 8 && hasNumber && hasSpecialChar;
  };


  export const passwordSchema = z.object({
    current_password: z.string()
    .min(8, "Password must be at least 8 characters long")
    .refine(isStrongPassword, "Password must contain at least one number and one special character"),

    new_password: z.string()
    .min(8, "Password must be at least 8 characters long")
    .refine(isStrongPassword, "Password must contain at least one number and one special character"),

    new_password_confirmation: z.string()
    .min(8, "Password must be at least 8 characters long")
    .refine(isStrongPassword, "Password must contain at least one number and one special character")
  })


  export type passwordSchemaType = z.infer<typeof passwordSchema>;