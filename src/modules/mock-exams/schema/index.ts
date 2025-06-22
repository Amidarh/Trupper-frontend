import { z } from 'zod';

export const examCardSchema = z.object({
  exam: z.string().min(1, 'Exam Type is required'),
  subjects: z
    .array(
      z.object({
        id: z.string().min(1, 'Subject ID is required'),
      })
    )
    .min(1, 'At least one subject is required'),
  category: z.string().min(1, 'Exam Category is required'),
});
export type ExamCardFormData = z.infer<typeof examCardSchema>;
