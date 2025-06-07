import { z } from "zod";

export const preferenceSchema = z.object({
    name: z.string().min(1, { message: "Organization Name is required" }),
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
    ), z.string().url()]).optional(),
});

export type PreferenceFormData = z.infer<typeof preferenceSchema>;

export const settingsSchema = z.object({
    enableSignup: z.boolean().optional(),
    defaultCategory: z.string().optional(),
    defaultSubCategory: z.string().optional(),
    defaultPassword: z.string().optional(),
    codeSignUp: z.boolean().optional(),
});

export type SettingsFormData = z.infer<typeof settingsSchema>;