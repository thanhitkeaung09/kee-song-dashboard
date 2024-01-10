// schema.ts
import { z, TypeOf } from 'zod';

export const productSchema = z.object({
  name: z.string().min(3, { message: 'name must be at least 3 characters' }),
  category: z.string().min(1, { message: 'category is required' }),
  sku: z.string().min(1, { message: 'sku is required' }),
});

export type ProductFormInput = TypeOf<typeof productSchema>;
