import { z } from "zod";
import { userReturnSchema } from "./user.schemas";
import { movieReturnSchema } from "./movie.schemas";

const favoriteSchema = z.object({
  favoriteMovieId: z.string().uuid(),
  movieId: z.string().uuid(),
  userId: z.string().uuid(),
  addedDate: z.date(),
});

const favoriteCreateSchema = favoriteSchema.omit({
  favoriteMovieId: true,
  userId: true,
  addedDate: true,
});

const favoriteReturnSchema = favoriteSchema;

const favoriteReadSchema = favoriteReturnSchema.array();

const favoriteCompleteReturnSchema = favoriteReturnSchema.extend({
  user: userReturnSchema,
  movie: movieReturnSchema,
});

const favoriteCompleteReadSchema = favoriteCompleteReturnSchema.array();

export {
  favoriteSchema,
  favoriteCreateSchema,
  favoriteReturnSchema,
  favoriteReadSchema,
  favoriteCompleteReturnSchema,
  favoriteCompleteReadSchema,
};
