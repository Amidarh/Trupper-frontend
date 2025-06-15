import { z } from 'zod';

export const questionSchema = z.object({
  exam: z.string().min(1, { message: 'Select an Exam' }),
  question: z.string().min(1, { message: 'Enter Question' }),
  subject: z.string().min(1, { message: 'Select Subject' }),
  questionType: z.string().min(1, { message: 'Select Question type' }),
  section: z.string().min(1, { message: 'Enter section' }),
  image: z
    .union([
      z
        .instanceof(File)
        .refine((file) => file.size <= 5 * 1024 * 1024, {
          message: 'File size must be less than 5MB',
        })
        .refine((file) => ['image/jpeg', 'image/png'].includes(file.type), {
          message: 'File must be a JPEG, PNG, or PDF',
        }),
      z.string().url(),
    ])
    .optional(),
  answer: z.string().min(1, { message: 'Enter Question answer' }),
  reason: z.string().min(1, { message: 'Provide question answer reason' }),
  questionCategory: z.string().optional(),
  a: z.string().min(1, { message: 'Provide option a' }),
  b: z.string().min(1, { message: 'Provide option b' }),
  c: z.string().min(1, { message: 'Provide option c' }),
  d: z.string().min(1, { message: 'Provide option d' }),
  status: z.string().optional(),
  // examyear: z.number().min(1, { message: "Provide exam year" })
});

export type QuestionFormData = z.infer<typeof questionSchema>;
