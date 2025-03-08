import { z } from "zod";

const actorSchema = z.object({
  actorId: z.string().uuid(),
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  birthDate: z.string().min(10, "BirthDate is required").max(10, "BirthDate must be 10 characters"),
  nationality: z
    .string()
    .min(1, "Nationality is required")
    .max(100, "Nationality must be less than 100 characters"),
});

const actorCreateSchema = actorSchema.omit({
  actorId: true,
});

const actorReturnSchema = actorSchema;
const actorReadSchema = actorReturnSchema.array();

const actorUpdateSchema = actorCreateSchema.partial();

export { actorSchema, actorCreateSchema, actorUpdateSchema, actorReturnSchema, actorReadSchema };
