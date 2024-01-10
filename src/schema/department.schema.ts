// schema.ts
import { z, TypeOf } from "zod";

export const departmentSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
});

export type DepartmentFormInput = TypeOf<typeof departmentSchema>;
