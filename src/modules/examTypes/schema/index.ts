import { z } from 'zod';

export const examTypeSchema = z.object({
  name: z.string().min(1, { message: 'Enter category name' }),
  status: z.boolean().optional(),
});

export type ExamTypeFormData = z.infer<typeof examTypeSchema>;
