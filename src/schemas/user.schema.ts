import { z } from "zod";

const userSchema = z.object({
  userId: z.string().uuid(),
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .email("Invalid email format")
    .max(100, "Email must be less than 100 characters"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be less than 100 characters"),
  admin: z.boolean().default(false),
  created_at: z.string(),
  updated_at: z.string(),
  deleted_at: z.string().nullable(),
});

const userCreateSchema = userSchema.omit({
  userId: true,
  created_at: true,
  updated_at: true,
  deleted_at: true,
});

const userUpdateSchema = userCreateSchema.partial();

export { userSchema, userCreateSchema, userUpdateSchema };
