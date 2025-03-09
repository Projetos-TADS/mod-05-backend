import { Request, Response } from "express";
import { castServices } from "../services";
import { CastReturn } from "../interfaces";

const addActorToMovie = async (request: Request, response: Response): Promise<Response> => {
  const cast: CastReturn = await castServices.addActorToMovie(
    response.locals.movie,
    response.locals.actor
  );

  return response.status(201).json(cast);
};

const removeActorFromMovie = async (request: Request, response: Response): Promise<Response> => {
  await castServices.removeActorFromMovie(response.locals.cast);

  return response.status(204).json();
};

export default {
  addActorToMovie,
  removeActorFromMovie,
};
