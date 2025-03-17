import { z } from "zod";
import { movieCompleteReturnSchema } from "./movie.schemas";

const directorMovieSchema = z.object({
  directorMovieId: z.string().uuid(),
  movieId: z.string().uuid(),
  directorId: z.string().uuid(),
  addedDate: z.date(),
});

const directorMovieCreateSchema = directorMovieSchema.omit({
  directorMovieId: true,
  addedDate: true,
});

const directorMovieReturnSchema = directorMovieSchema;

const directorMovieCompleteReturnSchema = directorMovieSchema.extend({
  movie: movieCompleteReturnSchema,
});

export {
  directorMovieSchema,
  directorMovieCreateSchema,
  directorMovieReturnSchema,
  directorMovieCompleteReturnSchema,
};
