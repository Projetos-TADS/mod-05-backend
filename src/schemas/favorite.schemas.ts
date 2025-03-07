import { z } from "zod";

const favoriteSchema = z.object({
  favoriteMovieId: z.string().uuid(),
  movieId: z.string().uuid(),
  userId: z.string().uuid(),
});

const favoriteCreateSchema = favoriteSchema.omit({
  favoriteMovieId: true,
});

const favoriteReturnSchema = favoriteSchema;

const favoriteReadSchema = favoriteReturnSchema.array();

export { favoriteSchema, favoriteCreateSchema, favoriteReturnSchema, favoriteReadSchema };
