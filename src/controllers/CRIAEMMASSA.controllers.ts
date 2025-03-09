import { Request, Response } from "express";
import { ActorModel } from "../models/Actor.model";
import { DirectorModel } from "../models/Director.model";
import {
  CastModel,
  DirectorMovieModel,
  FavoriteMovieModel,
  MovieModel,
  UserModel,
} from "../models";

export const criarAtoresEmMassa = async (request: Request, response: Response): Promise<any> => {
  for (const payload of request.body) {
    await ActorModel.create(payload);
  }
  return response.status(204).json();
};

export const criarDiretoresEmMassa = async (request: Request, response: Response): Promise<any> => {
  for (const payload of request.body) {
    await DirectorModel.create(payload);
  }
  return response.status(204).json();
};

export const criarFilmesEmMassa = async (request: Request, response: Response): Promise<any> => {
  for (const payload of request.body) {
    await MovieModel.create(payload);
  }
  return response.status(204).json();
};

export const criarCastEmMassa = async (request: Request, response: Response): Promise<any> => {
  for (const payload of request.body) {
    await CastModel.create(payload);
  }
  return response.status(204).json();
};

export const criarUserEmMassa = async (request: Request, response: Response): Promise<any> => {
  for (const payload of request.body) {
    await UserModel.create(payload);
  }
  return response.status(204).json();
};

export const addDiretoresEmMassa = async (request: Request, response: Response): Promise<any> => {
  for (const payload of request.body) {
    await DirectorMovieModel.create(payload);
  }
  return response.status(204).json();
};

export const addFavoritosEmMassa = async (request: Request, response: Response): Promise<any> => {
  for (const payload of request.body) {
    await FavoriteMovieModel.create(payload);
  }
  return response.status(204).json();
};
