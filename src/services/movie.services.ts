import {
  MovieCreate,
  MovieReturn,
  MovieUpdate,
  Pagination,
  PaginationParams,
} from "../interfaces";
import { MovieModel } from "../models";
import { ActorModel } from "../models/Actor.model";
import { DirectorModel } from "../models/Director.model";
import { movieReturnSchema } from "../schemas";

const getAllMovies = async ({
  page,
  perPage,
  prevPage,
  nextPage,
}: PaginationParams): Promise<Pagination> => {
  const { rows: movies, count }: { rows: MovieModel[]; count: number } =
    await MovieModel.findAndCountAll({
      offset: page,
      limit: perPage,
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

  if (count - page <= perPage) {
    nextPage = null;
  }

  return {
    prevPage,
    nextPage,
    count,
    data: movies,
  };
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
