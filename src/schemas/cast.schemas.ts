import { z } from "zod";

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

export { castSchema, castCreateSchema, castReturnSchema };
