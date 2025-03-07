import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { FavoriteMovieModel, UserModel } from "../models";

const verifyFavoriteIdExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const favoriteId: string = request.params.favoriteId;

  const favorite: FavoriteMovieModel | null = await FavoriteMovieModel.findByPk(favoriteId);

  if (!favorite) throw new AppError("Favorite not found", 404);

  response.locals = { ...response.locals, favorite };

  return next();
};

export default verifyFavoriteIdExists;
