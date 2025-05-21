import { z } from "zod";

export const subAdminSchema = z.object({
  firstName: z.string().min(1, { message: "Name is required" }),
  lastName: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
})

export type SubAdminFormData = z.infer<typeof subAdminSchema>;