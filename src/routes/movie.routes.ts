import { Router } from "express";
import middlewares from "../middlewares";
import { sessionSchema } from "../schemas";
import { sessionController } from "../controllers";
import movieControllers from "../controllers/movie.controllers";

export const movieRoutes: Router = Router();

// movieRoutes.post(
//   "",
//   middlewares.validateBody(userCreateSchema),
//   middlewares.verifyEmailExists,
//   movieRoutes.createUser
// );
movieRoutes.get("", middlewares.verifyToken, movieControllers.getAllMovies);
// movieRoutes.use("/:id", middlewares.verifyIdExists);
// movieRoutes.get("/:id", middlewares.verifyToken, movieRoutes.getUserById);
// movieRoutes.patch(
//   "/:id",
//   middlewares.validateBody(userUpdateSchema),
//   middlewares.verifyEmailExists,
//   movieRoutes.updateUser
// );
// movieRoutes.delete("/:id", movieRoutes.deleteUser);
