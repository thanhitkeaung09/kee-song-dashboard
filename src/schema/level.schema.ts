// schema.ts
import { z, TypeOf } from 'zod';

export const levelSchema = z.object({
  name: z.string().min(3, { message: 'name must be at least 3 characters' }),
});

export type LevelFormInput = TypeOf<typeof levelSchema>;
