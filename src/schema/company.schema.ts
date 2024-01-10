// schema.ts
import { z, TypeOf } from 'zod';

export const companySchema = z.object({
  name: z.string().min(3, { message: 'name must be at least 3 characters' }),
  size: z.string().min(1, { message: 'size is required' }),
  logo: z.any().optional(),
});

export type CompanyFormInput = TypeOf<typeof companySchema>;
