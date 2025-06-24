import { z } from 'zod';

const subjectSchema = z.object({
  value: z.string(),
  id: z.string(),
});

export const examCategorySchema = z.object({
  name: z.string().min(1, { message: 'Enter exam category name' }),
  subjects: z.array(subjectSchema),
  status: z.boolean().optional(),
  exam: z.string().optional(),
});

export type ExamCategoryFormData = z.infer<typeof examCategorySchema>;

export const editExamCategorySchema = z.object({
  name: z.string().min(1, { message: 'Enter exam category name' }),
  status: z.boolean().optional(),
  exam: z.string().optional(),
});

export type EditExamCategoryFormData = z.infer<typeof editExamCategorySchema>;
