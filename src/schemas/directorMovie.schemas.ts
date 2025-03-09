import { z } from "zod";

const directorMovieSchema = z.object({
  directorMovieId: z.string().uuid(),
  movieId: z.string().uuid(),
  directorId: z.string().uuid(),
  addedDate: z.date(),
  description: z
    .string()
    .min(1, "Description is required")
    .max(100, "Description must be less than 100 characters")
    .optional()
    .nullable(),
});

const directorMovieCreateSchema = directorMovieSchema.omit({
  directorMovieId: true,
  addedDate: true,
});

const directorMovieReturnSchema = directorMovieSchema;

export { directorMovieSchema, directorMovieCreateSchema, directorMovieReturnSchema };
