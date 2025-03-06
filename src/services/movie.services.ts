import { MovieCreate, MovieRead, MovieReturn, MovieUpdate } from "../interfaces";
import { MovieModel } from "../models";
import { movieReadSchema, movieReturnSchema } from "../schemas";

const getAllMovies = async (): Promise<MovieRead> => {
  const movies: Array<MovieModel> = await MovieModel.findAll();

  return movieReadSchema.parse(movies);
};

const createMovie = async (payLoad: MovieCreate): Promise<MovieReturn> => {
  const movie = await MovieModel.create(payLoad);

  return movieReturnSchema.parse(movie);
};

const updateMovie = async (movie: MovieModel, payLoad: MovieUpdate): Promise<MovieReturn> => {
  Object.assign(movie, payLoad);
  await movie.save();

  return movieReturnSchema.parse(movie);
};

const deleteMovie = async (movie: MovieModel): Promise<void> => {
  await movie!.destroy();
};

export default { getAllMovies, createMovie, deleteMovie, updateMovie };
