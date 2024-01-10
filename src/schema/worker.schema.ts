// schema.ts
import { z, TypeOf } from 'zod';

export const workerSchema = z.object({
  username: z.string().min(3, { message: 'Username must be at least 3 characters' }),
  email: z.string().min(1, { message: 'Email is required' }).email('Invalid email address'),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  profile: z.any(),
  user_level: z.string().min(1, { message: 'user level is required' })
});

export type WorkerFormInput = TypeOf<typeof workerSchema>;
