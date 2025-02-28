import e, { Request, Response } from "express";
import { UserModel } from "../models/index";
import { FindOptions, Op } from "sequelize";

const getAllUsers = async (request: Request, response: Response): Promise<Response> => {
  const users: Array<UserModel> = await UserModel.findAll();
  return response.send(users);
};

const getUserById = async (request: Request, response: Response): Promise<Response> => {
  const { id } = request.params;
  const user: UserModel | null = await UserModel.findByPk(id);

  return response.send(user);
};

const createUser = async (request: Request, response: Response): Promise<Response> => {
  const { name, email, password, admin } = request.body;

  const findOptions: FindOptions = {
    where: {
      email: email,
      deletedAt: {
        [Op.is]: null,
      },
    },
  };

  const existingUser: UserModel | null = await UserModel.findOne(findOptions);

  if (existingUser)
    return response.status(400).send("This email is already in use by another active user.");

  const user = await UserModel.create({ name, email, password, admin });
  return response.send(user);
};

const updateUser = async (request: Request, response: Response): Promise<Response> => {
  const { id } = request.params;
  const payLoad = request.body;
  const user: UserModel | null = await UserModel.findByPk(id);

  Object.assign(user!, payLoad);
  await user!.save();
  return response.send(user);
};

const deleteUser = async (request: Request, response: Response): Promise<Response> => {
  const { id } = request.params;
  const user: UserModel | null = await UserModel.findByPk(id);

  await user!.destroy();
  return response.send("User deleted.");
};

export { getAllUsers, getUserById, createUser, updateUser, deleteUser };
