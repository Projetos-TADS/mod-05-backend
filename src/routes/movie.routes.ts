import { Router } from "express";
import middlewares from "../middlewares";
import { movieCreateSchema, sessionSchema } from "../schemas";
import { sessionController } from "../controllers";
import movieControllers from "../controllers/movie.controllers";

export const movieRoutes: Router = Router();

movieRoutes.use(middlewares.verifyToken);
movieRoutes.post("", middlewares.validateBody(movieCreateSchema), movieControllers.createMovie);
movieRoutes.get("", movieControllers.getAllMovies);
// movieRoutes.use("/:id", middlewares.verifyIdExists);
// movieRoutes.get("/:id", middlewares.verifyToken, movieRoutes.getUserById);
// movieRoutes.patch(
//   "/:id",
//   middlewares.validateBody(userUpdateSchema),
//   middlewares.verifyEmailExists,
//   movieRoutes.updateUser
// );
// movieRoutes.delete("/:id", movieRoutes.deleteUser);
