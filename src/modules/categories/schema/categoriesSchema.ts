import { z } from 'zod';

export const categorySchema = z.object({
  name: z.string().min(1, { message: 'Enter category name' }),
  // description: z.string().min(1, { message: "provide Category description" }),
  status: z.boolean().optional(),
});

export type CategoryFormData = z.infer<typeof categorySchema>;

export const subCategorySchema = z.object({
  name: z.string().min(1, { message: 'Enter category name' }),
  userCategory: z.string().min(1, { message: 'Select a category' }),
  status: z.boolean().optional(),
});

export type SubCategoryFormData = z.infer<typeof subCategorySchema>;

export const examModeSchema = z.object({
  name: z.string().min(1, { message: 'Enter exam mode name' }),
  exam: z.string().min(1, { message: 'Select an exam' }),
  subCategory: z.string().optional(),
});

export type ExamModeFormData = z.infer<typeof examModeSchema>;

export const updateExamModeSchema = z.object({
  status: z.boolean(),
  validFrom: z.date({ required_error: 'Select the start time and date' }),
  validTill: z.date({ required_error: 'Select the end time and date' }),
});

export type UpdateExamModeFormData = z.infer<typeof updateExamModeSchema>;
