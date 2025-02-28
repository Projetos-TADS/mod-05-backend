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
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(),
});

const userCreateSchema = userSchema.omit({
  userId: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

const userReturnSchema = userSchema.omit({
  password: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});
const userReadSchema = userReturnSchema.array();

const userUpdateSchema = userCreateSchema.partial();

export { userSchema, userCreateSchema, userUpdateSchema, userReturnSchema, userReadSchema };
