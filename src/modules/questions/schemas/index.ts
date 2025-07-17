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

export const generateQuestionSchema = z.object({
  exam: z.string().min(1, { message: 'Select an Exam' }),
  subject: z.string().min(1, { message: 'Select Subject' }),
  questionType: z.string().min(1, { message: 'Select Question type' }),
  questionCategory: z.string().min(1, { message: 'Select Question type' }),
  noOfQuestions: z.number().min(1, { message: 'Enter number of questions' }),
  files: z
    .union([
      z
        .instanceof(File)
        .refine((file) => file.size <= 5 * 1024 * 1024, {
          message: 'File size must be less than 5MB',
        })
        .refine(
          (file) =>
            [
              'image/jpeg',
              'image/png',
              'application/pdf',
              'application/msword',
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
              'application/vnd.ms-excel',
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
              'text/plain',
            ].includes(file.type),
          {
            message:
              'File must be an image (JPEG, PNG), PDF, Word, Excel, or Text file',
          }
        ),
      z.string().url(),
    ])
    .optional(),
});

export type GenerateQuestionFormData = z.infer<typeof generateQuestionSchema>;
