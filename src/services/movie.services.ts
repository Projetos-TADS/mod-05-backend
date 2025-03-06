import { MovieRead } from "../interfaces";
import { MovieModel } from "../models";
import { movieReadSchema } from "../schemas";

const getAllMovies = async (): Promise<MovieRead> => {
  const movies: Array<MovieModel> = await MovieModel.findAll();

  return movieReadSchema.parse(movies);
};

// const createUser = async (payLoad: UserCreate): Promise<UserReturn> => {
//   const user = await UserModel.create(payLoad);

//   return userReturnSchema.parse(user);
// };

// const updateUser = async (user: UserModel, payLoad: UserUpdate): Promise<UserReturn> => {
//   Object.assign(user, payLoad);
//   await user.save();

//   return userReturnSchema.parse(user);
// };

// const deleteUser = async (user: UserModel): Promise<void> => {
//   await user!.destroy();
// };

export default { getAllMovies };
