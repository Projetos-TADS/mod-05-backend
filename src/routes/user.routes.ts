import express from "express";
import { userController } from "../controllers/index";
import middlewares from "../middlewares";
import { userCreateSchema, userUpdateSchema } from "../schemas";

export const userRoutes = express.Router();

userRoutes.post("", middlewares.validateBody(userCreateSchema), userController.createUser);
userRoutes.get("", userController.getAllUsers);
userRoutes.use("/:id", middlewares.verifyIdExists);
userRoutes.get("/:id", userController.getUserById);
userRoutes.patch("/:id", middlewares.validateBody(userUpdateSchema), userController.updateUser);
userRoutes.delete("/:id", userController.deleteUser);
