// schema.ts
import { z, TypeOf } from 'zod';

export const locationSchema = z.object({
  bin: z.string().min(1, { message: 'bin is required' }),
  row: z.string().min(1, { message: 'row is required' }),
  column: z.string().min(1, { message: 'column is required' })
});

export type LocationFormInput = TypeOf<typeof locationSchema>;
