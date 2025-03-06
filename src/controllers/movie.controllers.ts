import { Request, Response } from "express";
import { movieServices } from "../services";
import { MovieRead, MovieReturn } from "../interfaces";

const getAllMovies = async (request: Request, response: Response): Promise<Response> => {
  const movies: MovieRead = await movieServices.getAllMovies();

  return response.status(200).json(movies);
};

// const getUserById = async (request: Request, response: Response): Promise<Response> => {
//   return response.status(200).json(userReturnSchema.parse(response.locals.user));
// };

const createMovie = async (request: Request, response: Response): Promise<Response> => {
  const movie: MovieReturn = await movieServices.createMovie(request.body);

  return response.status(201).json(movie);
};

// const updateUser = async (request: Request, response: Response): Promise<Response> => {
//   const payLoad: UserUpdate = request.body;
//   const foundUser: UserModel = response.locals.user;

//   const user: UserReturn = await userServices.updateUser(foundUser, payLoad);

//   return response.status(200).json(user);
// };

// const deleteUser = async (request: Request, response: Response): Promise<Response> => {
//   await userServices.deleteUser(response.locals.user);

//   return response.status(204).json();
// };

export default { getAllMovies, createMovie };
