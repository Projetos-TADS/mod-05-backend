import e, { Request, Response } from "express";
import UserModel from "../models/UserModel";
import { FindOptions, Op } from "sequelize";

export const getAllUsers = async (request: Request, response: Response) => {
  const users: Array<UserModel> = await UserModel.findAll();
  response.send(users);
};

export const getUserById = async (request: Request, response: Response) => {
  const { id } = request.params;
  const user: UserModel | null = await UserModel.findByPk(id);
  if (!user) {
    return response.status(404).send("User not found.");
  }
  response.send(user);
};

export const createUser = async (request: Request, response: Response) => {
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

  if (existingUser) {
    return response.status(400).send("Este email já está em uso por outro usuário ativo.");
  }
  const user = await UserModel.create({ name, email, password, admin });
  response.send(user);
};

export const updateUser = async (request: Request, response: Response) => {
  const { id } = request.params;
  const { name, email, password, admin } = request.body;
  const user: UserModel | null = await UserModel.findByPk(id);
  if (!user) {
    return response.status(404).send("User not found.");
  }
  user.name = name;
  user.email = email;
  user.password = password;
  user.admin = admin;
  await user.save();
  response.send(user);
};

export const deleteUser = async (request: Request, response: Response) => {
  const { id } = request.params;
  const user: UserModel | null = await UserModel.findByPk(id);
  if (!user) {
    return response.status(404).send("User not found.");
  }
  await user.destroy();
  response.send("User deleted.");
};
