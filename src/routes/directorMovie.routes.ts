import { Router } from "express";
import middlewares from "../middlewares";
import { directorMovieCreateSchema } from "../schemas";
import { directorMovieControllers } from "../controllers";

export const directorMovieRoutes: Router = Router();

directorMovieRoutes.use(middlewares.verifyToken);

directorMovieRoutes.post(
  "",
  middlewares.isAdmin,
  middlewares.validateBody(directorMovieCreateSchema),
  middlewares.verifyDirectorIdExists,
  middlewares.verifyMovieIdExists,
  directorMovieControllers.addDirectorToMovie
);
directorMovieRoutes.delete(
  "/:directorMovieId",
  middlewares.isAdmin,
  middlewares.verifyDirectorMovieIdExists,
  directorMovieControllers.removeDirectorFromMovie
);
