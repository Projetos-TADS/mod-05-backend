import { Request, Response } from "express";
import { movieServices } from "../services";
import { MovieRead, MovieReturn, MovieUpdate } from "../interfaces";
import { movieReturnSchema } from "../schemas";
import { MovieModel } from "../models";

const getAllMovies = async (request: Request, response: Response): Promise<Response> => {
  const movies: MovieRead = await movieServices.getAllMovies();

  return response.status(200).json(movies);
};

const getMovieById = async (request: Request, response: Response): Promise<Response> => {
  return response.status(200).json(movieReturnSchema.parse(response.locals.movie));
};

const createMovie = async (request: Request, response: Response): Promise<Response> => {
  const movie: MovieReturn = await movieServices.createMovie(request.body);

  return response.status(201).json(movie);
};

const updateMovie = async (request: Request, response: Response): Promise<Response> => {
  const payLoad: MovieUpdate = request.body;
  const foundMovie: MovieModel = response.locals.movie;

  const movie: MovieReturn = await movieServices.updateMovie(foundMovie, payLoad);

  return response.status(200).json(movie);
};

const deleteMovie = async (request: Request, response: Response): Promise<Response> => {
  await movieServices.deleteMovie(response.locals.movie);

  return response.status(204).json();
};

export default { getAllMovies, createMovie, getMovieById, deleteMovie, updateMovie };
