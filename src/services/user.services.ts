import { FindOptions } from "sequelize";
import { GetAllUsers, UserCreate, UserUpdate } from "../interfaces";
import { UserModel } from "../models";
import { Op } from "sequelize";
import { AppError } from "../errors";

const getAllUsers = async (): Promise<GetAllUsers> => {
  const users: Array<UserModel> = await UserModel.findAll();

  return users;
};

const createUser = async (payLoad: UserCreate): Promise<UserModel> => {
  const findOptions: FindOptions = {
    where: {
      email: payLoad.email,
      deletedAt: {
        [Op.is]: null,
      },
    },
  };

  const existingUser: UserModel | null = await UserModel.findOne(findOptions);

  if (existingUser) throw new AppError("This email is already in use by another active user.", 400);

  const user = await UserModel.create(payLoad);

  return user;
};

const updateUser = async (user: UserModel, payLoad: UserUpdate): Promise<UserModel> => {
  Object.assign(user, payLoad);

  return await user.save();
};

const deleteUser = async (user: UserModel): Promise<void> => {
  await user!.destroy();
};

export default { getAllUsers, updateUser, deleteUser, createUser };
