import { CastModel, DirectorMovieModel, MovieModel } from "../models";
import { DirectorMovieReturn } from "../interfaces";
import { directorMovieReturnSchema } from "../schemas";
import { AppError } from "../errors";
import { DirectorModel } from "../models/Director.model";

const addDirectorToMovie = async (
  movie: MovieModel,
  director: DirectorModel,
  description: string | null
): Promise<DirectorMovieReturn> => {
  const directorMoviePayload = {
    movieId: movie.movieId,
    directorId: director.directorId,
    description: description,
  };
  const [directorMovie, created] = await DirectorMovieModel.findOrCreate({
    where: directorMoviePayload,
    defaults: directorMoviePayload,
  });

  if (!created) throw new AppError("Director already edded");

  return directorMovieReturnSchema.parse(directorMovie);
};

const removeDirectorFromMovie = async (directorMovie: CastModel): Promise<void> => {
  await directorMovie!.destroy();
};

export default { addDirectorToMovie, removeDirectorFromMovie };
