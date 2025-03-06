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
userRoutes.use("/:userId", middlewares.verifyUserIdExists);
userRoutes.get("/:userId", middlewares.verifyToken, userController.getUserById);
userRoutes.patch(
  "/:userId",
  middlewares.validateBody(userUpdateSchema),
  middlewares.verifyEmailExists,
  userController.updateUser
);
userRoutes.delete("/:userId", userController.deleteUser);
