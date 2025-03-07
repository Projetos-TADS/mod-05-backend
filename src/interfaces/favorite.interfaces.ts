import { z } from "zod";
import { Optional } from "sequelize";
import {
  favoriteCompleteReadSchema,
  favoriteCompleteReturnSchema,
  favoriteCreateSchema,
  favoriteReadSchema,
  favoriteReturnSchema,
} from "../schemas/favorite.schemas";

type FavoriteCreate = z.infer<typeof favoriteCreateSchema>;
type FavoriteRead = z.infer<typeof favoriteReadSchema>;
type FavoriteReturn = z.infer<typeof favoriteReturnSchema>;

interface FavoriteMovieAttributes {
  favoriteMovieId: string;
  userId: string;
  movieId: string;
  addedDate: Date;
}

interface FavoriteMovieCreationAttributes
  extends Optional<FavoriteMovieAttributes, "favoriteMovieId" | "addedDate"> {}

type FavoriteCompleteRead = z.infer<typeof favoriteCompleteReadSchema>;
type FavoriteCompleteReturn = z.infer<typeof favoriteCompleteReturnSchema>;

export {
  FavoriteCreate,
  FavoriteRead,
  FavoriteReturn,
  FavoriteMovieAttributes,
  FavoriteMovieCreationAttributes,
  FavoriteCompleteRead,
  FavoriteCompleteReturn,
};
