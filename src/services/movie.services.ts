import { MovieCompleteReadSchema, MovieCreate, MovieReturn, MovieUpdate } from "../interfaces";
import { MovieModel } from "../models";
import { ActorModel } from "../models/Actor.model";
import { DirectorModel } from "../models/Director.model";
import { movieCompleteReadSchema, movieReturnSchema } from "../schemas";

const getAllMovies = async (): Promise<MovieCompleteReadSchema> => {
  const movies: Array<MovieModel> = await MovieModel.findAll({
    include: [
      {
        model: ActorModel,
        as: "actors",
        attributes: ["actorId", "name", "birthDate", "nationality"],
      },
      {
        model: DirectorModel,
        as: "directors",
        attributes: ["directorId", "name", "birthDate", "nationality"],
      },
    ],
  });

  return movieCompleteReadSchema.parse(movies);
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
