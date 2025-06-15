import { z } from 'zod';

export const newsletterSchema = z.object({
  userCategory: z.string().optional(),
  subCategory: z.string().optional(),
  title: z.string().min(1, { message: 'Enter Newsletter Title' }),
  userType: z.string().min(1, { message: 'Select user type' }),
  // status: z.string().min(1, { message: "Newsletter Status is required" }),
  // subject: z.string().min(1, { message: "Newsletter subject is required" }),
  content: z.string().min(1, { message: 'Newsletter content is required' }),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;
