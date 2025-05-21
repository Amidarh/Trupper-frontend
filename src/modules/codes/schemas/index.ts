import {z} from 'zod';

export const codeSchema = z.object({
    category: z.string().min(1, { message: "Category is required" }),
    subCategory: z.string().min(1, { message: "Sub Category is required" }),
    count: z.number().min(1, { message: "Sub Category is required" }),
});

export type CodeFormData = z.infer<typeof codeSchema>;