import { z } from "zod";

const actorMovieSchema = z.object({
  actorMovieId: z.string().uuid(),
  movieId: z.string().uuid(),
  actorId: z.string().uuid(),
});

const actorMovieCreateSchema = actorMovieSchema.omit({
  actorMovieId: true,
});

const actorMovieReturnSchema = actorMovieSchema;

const actorMovieReadSchema = actorMovieReturnSchema.array();

export { actorMovieSchema, actorMovieCreateSchema, actorMovieReturnSchema, actorMovieReadSchema };
