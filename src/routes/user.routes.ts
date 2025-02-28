import express from "express";
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from "../controllers/index";
import middlewares from "../middlewares";
import { userCreateSchema, userUpdateSchema } from "../schemas";

export const userRoutes = express.Router();

userRoutes.post("", middlewares.validateBody(userCreateSchema), createUser);
userRoutes.get("", getAllUsers);
userRoutes.use("/:id", middlewares.verifyIdExists);
userRoutes.get("/:id", getUserById);
userRoutes.patch("/:id", middlewares.validateBody(userUpdateSchema), updateUser);
userRoutes.delete("/:id", deleteUser);
