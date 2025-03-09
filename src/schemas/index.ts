import {
  userSchema,
  userCreateSchema,
  userUpdateSchema,
  userReturnSchema,
  userReadSchema,
} from "./user.schemas";
import {
  movieSchema,
  movieCreateSchema,
  movieUpdateSchema,
  movieReturnSchema,
  movieReadSchema,
  movieCompleteReadSchema,
  movieCompleteReturnSchema,
} from "./movie.schemas";
import { sessionSchema } from "./session.schemas";
import {
  favoriteSchema,
  favoriteCreateSchema,
  favoriteReturnSchema,
  favoriteReadSchema,
  favoriteCompleteReturnSchema,
  favoriteCompleteReadSchema,
} from "./favorite.schemas";
import {
  actorSchema,
  actorCreateSchema,
  actorUpdateSchema,
  actorReturnSchema,
  actorReadSchema,
} from "./actor.schemas";

import {
  actorMovieSchema,
  actorMovieCreateSchema,
  actorMovieReturnSchema,
  actorMovieReadSchema,
} from "./actorMovie.schemas";
import {
  directorSchema,
  directorCreateSchema,
  directorUpdateSchema,
  directorReturnSchema,
  directorReadSchema,
} from "./director.schemas";
import { castSchema, castCreateSchema, CastReturnSchema } from "./cast.schemas";

export {
  userSchema,
  userCreateSchema,
  userUpdateSchema,
  userReturnSchema,
  userReadSchema,
  sessionSchema,
  movieSchema,
  movieCreateSchema,
  movieUpdateSchema,
  movieReturnSchema,
  movieReadSchema,
  movieCompleteReadSchema,
  movieCompleteReturnSchema,
  favoriteSchema,
  favoriteCreateSchema,
  favoriteReturnSchema,
  favoriteReadSchema,
  favoriteCompleteReturnSchema,
  favoriteCompleteReadSchema,
  actorSchema,
  actorCreateSchema,
  actorUpdateSchema,
  actorReturnSchema,
  actorReadSchema,
  actorMovieSchema,
  actorMovieCreateSchema,
  actorMovieReturnSchema,
  actorMovieReadSchema,
  directorSchema,
  directorCreateSchema,
  directorUpdateSchema,
  directorReturnSchema,
  directorReadSchema,
  castSchema,
  castCreateSchema,
  CastReturnSchema,
};
