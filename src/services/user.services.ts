import { UserCreate, UserUpdate } from "../interfaces";
import { UserModel } from "../models";
import { userReadSchema, userReturnSchema } from "../schemas";
import { UserRead, UserReturn } from "../interfaces/user.interfaces";
import { FavoriteMovieModel } from "../models/FavoriteMovie.model";

const getAllUsers = async (): Promise<UserRead> => {
  const users: Array<UserModel> = await UserModel.findAll();

  return userReadSchema.parse(users);
};

const createUser = async (payLoad: UserCreate): Promise<UserReturn> => {
  const user = await UserModel.create(payLoad);

  return userReturnSchema.parse(user);
};

const updateUser = async (user: UserModel, payLoad: UserUpdate): Promise<UserReturn> => {
  Object.assign(user, payLoad);
  await user.save();

  return userReturnSchema.parse(user);
};

const deleteUser = async (user: UserModel): Promise<void> => {
  await user!.destroy();
};

export default { getAllUsers, updateUser, deleteUser, createUser };
