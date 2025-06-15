import { z } from 'zod';

export const subjectSchema = z.object({
  name: z.string().min(1, { message: 'Subject name is required' }),
  status: z.boolean().optional(),
  exam: z.string().min(1, { message: 'Please select an exam' }),
});

export type SubjectFormData = z.infer<typeof subjectSchema>;
