import { z } from "zod";
import { Optional } from "sequelize";
import { actorMovieCreateSchema, actorMovieReturnSchema } from "../schemas/actorMovie.schemas";
import { actorReadSchema } from "../schemas";

type ActorMovieCreate = z.infer<typeof actorMovieCreateSchema>;
type ActorMovieRead = z.infer<typeof actorReadSchema>;
type ActorMovieReturn = z.infer<typeof actorMovieReturnSchema>;

interface ActorMovieAttributes {
  actorMovieId: string;
  actorId: string;
  movieId: string;
}

interface ActorMovieCreationAttributes extends Optional<ActorMovieAttributes, "actorMovieId"> {}

export {
  ActorMovieCreate,
  ActorMovieRead,
  ActorMovieReturn,
  ActorMovieAttributes,
  ActorMovieCreationAttributes,
};
