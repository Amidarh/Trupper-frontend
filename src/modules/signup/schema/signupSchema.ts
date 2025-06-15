import { z } from 'zod';

export const signupSchema = z.object({
  firstName: z.string().min(1, { message: 'First Name is required' }),
  lastName: z.string().min(1, { message: 'Last Name is required' }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
  code: z.string().optional(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
  confirmPassword: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
});

export type SignupFormData = z.infer<typeof signupSchema>;
