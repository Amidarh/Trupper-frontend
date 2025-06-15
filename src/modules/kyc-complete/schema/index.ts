import { z } from 'zod';

export const subAdminKycSchema = z.object({
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
  confirmPassword: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
});

export type SubAdminKycSchemaFormData = z.infer<typeof subAdminKycSchema>;
