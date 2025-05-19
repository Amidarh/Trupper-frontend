import { z } from 'zod';

export const categorySchema = z.object({
    name: z.string().min(1, { message: "Enter category name" }),
    // description: z.string().min(1, { message: "provide Category description" }),
    status: z.boolean().optional()
});

export type CategoryFormData = z.infer<typeof categorySchema>;