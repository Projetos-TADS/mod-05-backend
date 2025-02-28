import express from "express";
import { userController } from "../controllers/index";
import middlewares from "../middlewares";
import { userCreateSchema, userUpdateSchema } from "../schemas";

export const userRoutes = express.Router();

userRoutes.post(
  "",
  middlewares.validateBody(userCreateSchema),
  middlewares.verifyEmailExists,
  userController.createUser
);
userRoutes.get("", middlewares.verifyToken, userController.getAllUsers);
userRoutes.use("/:id", middlewares.verifyIdExists);
userRoutes.get("/:id", middlewares.verifyToken, userController.getUserById);
userRoutes.patch("/:id", middlewares.validateBody(userUpdateSchema), userController.updateUser);
userRoutes.delete("/:id", userController.deleteUser);
