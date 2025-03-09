import { UserCreate, UserUpdate, UserAttributes, UserCreationAttributes } from "./user.interfaces";
import { SessionCreate, SessionReturn } from "./session.interfaces";
import {
  MovieCreate,
  MovieUpdate,
  MovieRead,
  MovieCompleteReadSchema,
  MovieReturn,
  MovieAttributes,
  MovieCreationAttributes,
} from "./movie.interfaces";
import {
  FavoriteCreate,
  FavoriteRead,
  FavoriteReturn,
  FavoriteMovieAttributes,
  FavoriteMovieCreationAttributes,
  FavoriteCompleteRead,
  FavoriteCompleteReturn,
} from "./favorite.interfaces";
import {
  ActorCreate,
  ActorRead,
  ActorReturn,
  ActorAttributes,
  ActorCreationAttributes,
  ActorUpdate,
} from "./actor.interfaces";
import {
  ActorMovieCreate,
  ActorMovieRead,
  ActorMovieReturn,
  ActorMovieAttributes,
  ActorMovieCreationAttributes,
} from "./actorMovie.interfaces";
import {
  DirectorCreate,
  DirectorRead,
  DirectorReturn,
  DirectorAttributes,
  DirectorCreationAttributes,
  DirectorUpdate,
} from "./director.interfaces";

import { CastCreate, CastReturn, CastAttributes, CastCreationAttributes } from "./cast.interfaces";
import {
  DirectorMovieCreate,
  DirectorMovieReturn,
  DirectorMovieAttributes,
  DirectorMovieCreationAttributes,
} from "./directorMovie.interfaces";

export {
  UserCreate,
  UserUpdate,
  SessionCreate,
  SessionReturn,
  UserAttributes,
  UserCreationAttributes,
  MovieCreate,
  MovieUpdate,
  MovieRead,
  MovieCompleteReadSchema,
  MovieReturn,
  MovieAttributes,
  MovieCreationAttributes,
  FavoriteCreate,
  FavoriteRead,
  FavoriteReturn,
  FavoriteMovieAttributes,
  FavoriteMovieCreationAttributes,
  FavoriteCompleteRead,
  FavoriteCompleteReturn,
  ActorCreate,
  ActorRead,
  ActorReturn,
  ActorAttributes,
  ActorCreationAttributes,
  ActorMovieCreate,
  ActorMovieRead,
  ActorMovieReturn,
  ActorMovieAttributes,
  ActorMovieCreationAttributes,
  ActorUpdate,
  DirectorCreate,
  DirectorRead,
  DirectorReturn,
  DirectorAttributes,
  DirectorCreationAttributes,
  DirectorUpdate,
  CastCreate,
  CastReturn,
  CastAttributes,
  CastCreationAttributes,
  DirectorMovieCreate,
  DirectorMovieReturn,
  DirectorMovieAttributes,
  DirectorMovieCreationAttributes,
};
