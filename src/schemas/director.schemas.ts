import { z } from "zod";

const directorSchema = z.object({
  directorId: z.string().uuid(),
  name: z
    .string()
    .min(1, "Director is required")
    .max(100, "Director must be less than 100 characters"),
  birthDate: z.string().min(10, "BirthDate is required").max(10, "BirthDate must be 10 characters"),
  nationality: z
    .string()
    .min(1, "Nationality is required")
    .max(100, "Nationality must be less than 100 characters"),
});

const directorCreateSchema = directorSchema.omit({
  directorId: true,
});

const directorReturnSchema = directorSchema;
const directorReadSchema = directorReturnSchema.array();

const directorUpdateSchema = directorCreateSchema.partial();

export {
  directorSchema,
  directorCreateSchema,
  directorUpdateSchema,
  directorReturnSchema,
  directorReadSchema,
};
