import { Request, Response } from "express";
import { DirectorMovieReturn } from "../interfaces";
import { directorMovieServices } from "../services";

const addDirectorToMovie = async (request: Request, response: Response): Promise<Response> => {
  const directorMovie: DirectorMovieReturn = await directorMovieServices.addDirectorToMovie(
    response.locals.movie,
    response.locals.director,
    request.body.description ?? null
  );

  return response.status(201).json(directorMovie);
};

const removeDirectorFromMovie = async (request: Request, response: Response): Promise<Response> => {
  await directorMovieServices.removeDirectorFromMovie(response.locals.directorMovie);

  return response.status(204).json();
};

export default {
  addDirectorToMovie,
  removeDirectorFromMovie,
};
