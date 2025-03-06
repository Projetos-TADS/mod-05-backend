import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { MovieModel, UserModel } from "../models";

const verifyMovieIdExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const movieId: string = request.params.movieId;

  const movie: MovieModel | null = await MovieModel.findByPk(movieId);

  if (!movie) throw new AppError("Movie not found", 404);

  response.locals = { ...response.locals, movie };

  return next();
};

export default verifyMovieIdExists;
