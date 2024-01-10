// schema.ts
import { z, TypeOf } from "zod";

export const customerSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Invalid email address"),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  profile: z.any(),
  company: z.string().min(1, { message: 'Company is required' }),
  address: z.string().min(1, { message: 'Address is required' }),
  dateOfBirth: z.string().min(1, { message: 'DOB is required' }),
});

export type CustomerFormInput = TypeOf<typeof customerSchema>;
