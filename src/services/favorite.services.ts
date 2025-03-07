import { FavoriteCreate, FavoriteRead, FavoriteReturn, UserCreate } from "../interfaces";
import { MovieModel, UserModel } from "../models";
import { userReturnSchema } from "../schemas";
import { UserReturn } from "../interfaces/user.interfaces";
import { FavoriteMovieModel } from "../models/FavoriteMovie.model";
import { favoriteReadSchema, favoriteReturnSchema } from "../schemas/favorite.schemas";

const getAllFavoritesFromUser = async (user: UserModel): Promise<FavoriteRead> => {
  const userFavorites = await FavoriteMovieModel.findAll({
    where: { userId: user.userId },
    include: [
      {
        model: MovieModel,
        as: "movie",
        attributes: ["movieId", "title", "description"],
      },
    ],
    raw: true,
  });

  // return favoriteReadSchema.parse(userFavorites);
  return userFavorites;
};

const createFavorite = async (movie: MovieModel, user: UserModel): Promise<FavoriteReturn> => {
  const favoritePayload = { movieId: movie.movieId, userId: user.userId };
  const userFavorite = await FavoriteMovieModel.create(favoritePayload);

  return favoriteReturnSchema.parse(userFavorite);
};

const deleteFavorite = async (userFavorite: UserModel): Promise<void> => {
  await userFavorite!.destroy();
};

export default { getAllFavoritesFromUser, createFavorite, deleteFavorite };
