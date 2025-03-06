import { Router } from "express";
import middlewares from "../middlewares";
import { movieCreateSchema, movieUpdateSchema } from "../schemas";
import movieControllers from "../controllers/movie.controllers";

export const movieRoutes: Router = Router();

movieRoutes.use(middlewares.verifyToken);
movieRoutes.post("", middlewares.validateBody(movieCreateSchema), movieControllers.createMovie);
movieRoutes.get("", movieControllers.getAllMovies);
movieRoutes.use("/:movieId", middlewares.verifyMovieIdExists);
movieRoutes.get("/:movieId", middlewares.verifyToken, movieControllers.getMovieById);
movieRoutes.patch(
  "/:movieId",
  middlewares.validateBody(movieUpdateSchema),
  movieControllers.updateMovie
);
movieRoutes.delete("/:movieId", movieControllers.deleteMovie);
