import { z } from "zod";

export const examSchema = z.object({
    image:z.union([
      z.instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: 'File size must be less than 5MB',
    })
    .refine(
      (file) =>
        ['image/jpeg', 'image/png'].includes(file.type),
      {
        message: 'File must be a JPEG, PNG, or PDF',
      }
    ), z.string().url()]),
    name: z.string().min(1, { message: "Enter Exam Name" }),
    acronym: z.string().min(1, { message: "Enter Exam Acronym" }),
    duration: z.string().min(1, { message: "Enter Exam Duration" }),
    examType: z.string().min(1, { message: "Select Exam Type" }),
    category: z.string().optional(),
    // image: z.string().min(1, { message: "Select Exam Cover Image" }),
    maxNoOfSubjects: z.number().min(1, { message: "set the number of subject to be select at once" } ),
    minNoOfSubjects: z.number().min(1, { message: "set the minimum number of subject to be select at once" } ),
    subjectToBeWritten: z.number().min(1, { message: "set the number of subjects to be written at once" } ),
    noOfQuestions: z.number().min(1, { message: "set the number of questions to be written at one" }),
    status: z.boolean().optional(),
    scoreMultiplier: z.number().min(1, { message: "Enter the number that will multiply the numnber of questions to get user score " })
});

export type ExamFormData = z.infer<typeof examSchema>;