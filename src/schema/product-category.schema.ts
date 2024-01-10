// schema.ts
import { z, TypeOf } from 'zod';

export const productCategorySchema = z.object({
  name: z.string().min(3, { message: 'name must be at least 3 characters' }),
});

export type ProductCategoryFormInput = TypeOf<typeof productCategorySchema>;
