import { z } from 'zod';

export const selectSChema = z.object({
selectedOption: z.string().min(1, "Please select an option"),
})

export type selectSchemaType = z.infer<typeof selectSChema>;