import { Request, Response } from "express";
import { favoriteServices } from "../services";
import { FavoriteReturn } from "../interfaces";
import { favoriteCompleteReturnSchema } from "../schemas";

const getAllFavoritesFromUser = async (request: Request, response: Response): Promise<Response> => {
  const userFavorites = await favoriteServices.getAllFavoritesFromUser(response.locals.user);

  return response.status(200).json(userFavorites);
};

const getFavoriteById = async (request: Request, response: Response): Promise<Response> => {
  return response.status(200).json(favoriteCompleteReturnSchema.parse(response.locals.favorite));
};

const createFavorite = async (request: Request, response: Response): Promise<Response> => {
  const favorite: FavoriteReturn = await favoriteServices.createFavorite(
    response.locals.movie,
    response.locals.user
  );

  return response.status(201).json(favorite);
};

const deleteFavorite = async (request: Request, response: Response): Promise<Response> => {
  await favoriteServices.deleteFavorite(response.locals.favorite);

  return response.status(204).json();
};

export default {
  getAllFavoritesFromUser,
  getFavoriteById,
  createFavorite,
  deleteFavorite,
};
