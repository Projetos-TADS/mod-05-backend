import { Request, Response } from "express";
import { UserModel } from "../models";
import { favoriteServices, userServices } from "../services";
import { FavoriteRead, FavoriteReturn, UserUpdate } from "../interfaces";
import { UserRead, UserReturn } from "../interfaces/user.interfaces";
import { userReturnSchema } from "../schemas";

const getAllFavoritesFromUser = async (request: Request, response: Response): Promise<Response> => {
  const userFavorites: FavoriteRead = await favoriteServices.getAllFavoritesFromUser(
    response.locals.user
  );

  return response.status(200).json(userFavorites);
};

const getFavoriteById = async (request: Request, response: Response): Promise<Response> => {
  return response.status(200).json(userReturnSchema.parse(response.locals.user));
};

const createFavorite = async (request: Request, response: Response): Promise<Response> => {
  const favorite: FavoriteReturn = await favoriteServices.createFavorite(
    request.body,
    response.locals.user
  );

  return response.status(201).json(favorite);
};

const deleteFavorite = async (request: Request, response: Response): Promise<Response> => {
  await userServices.deleteUser(response.locals.user);

  return response.status(204).json();
};

export default {
  getAllFavoritesFromUser,
  getFavoriteById,
  createFavorite,
  deleteFavorite,
};
