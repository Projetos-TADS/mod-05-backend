import { MovieCreate, MovieRead, MovieReturn } from "../interfaces";
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

// const updateUser = async (user: UserModel, payLoad: UserUpdate): Promise<UserReturn> => {
//   Object.assign(user, payLoad);
//   await user.save();

//   return userReturnSchema.parse(user);
// };

// const deleteUser = async (user: UserModel): Promise<void> => {
//   await user!.destroy();
// };

export default { getAllMovies, createMovie };
