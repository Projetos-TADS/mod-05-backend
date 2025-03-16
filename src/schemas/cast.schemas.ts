import { z } from "zod";
import { movieCompleteReturnSchema } from "./movie.schemas";

const castSchema = z.object({
  castId: z.string().uuid(),
  movieId: z.string().uuid(),
  actorId: z.string().uuid(),
  addedDate: z.date(),
});

const castCreateSchema = castSchema.omit({
  castId: true,
  addedDate: true,
});

const castReturnSchema = castSchema;

const castCompleteReturnSchema = castSchema.extend({
  movie: movieCompleteReturnSchema,
});

export { castSchema, castCreateSchema, castReturnSchema, castCompleteReturnSchema };
