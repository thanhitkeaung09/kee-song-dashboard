// schema.ts
import { z, TypeOf } from 'zod';

export const binShema = z.object({
  name: z.string().min(3, { message: 'name must be at least 3 characters' }),
  location_level: z.string().min(1, { message: 'location_level is required' })
});

export type BinFormInput = TypeOf<typeof binShema>;
