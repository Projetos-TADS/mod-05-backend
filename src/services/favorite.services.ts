import { FavoriteRead, FavoriteReturn } from "../interfaces";
import { MovieModel, UserModel } from "../models";
import { FavoriteMovieModel } from "../models/FavoriteMovie.model";
import { favoriteReturnSchema } from "../schemas/favorite.schemas";
import { AppError } from "../errors";

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
  const [userFavorite, created] = await FavoriteMovieModel.findOrCreate({
    where: favoritePayload,
    defaults: favoritePayload,
  });

  if (!created) throw new AppError("Favorite already exists");

  return favoriteReturnSchema.parse(userFavorite);
};

const deleteFavorite = async (favorite: FavoriteMovieModel): Promise<void> => {
  await favorite!.destroy();
};

export default { getAllFavoritesFromUser, createFavorite, deleteFavorite };
