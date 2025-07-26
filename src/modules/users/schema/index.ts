import { z } from 'zod';

export const createUserWithLinkSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  category: z.string().min(1, { message: 'Category is required' }),
  subCategory: z.string().min(1, { message: 'Sub category is required' }),
});

export type CreateUserWithLinkSchema = z.infer<typeof createUserWithLinkSchema>;
