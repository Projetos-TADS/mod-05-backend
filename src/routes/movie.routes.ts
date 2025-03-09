import { Router } from "express";
import middlewares from "../middlewares";
import { movieCreateSchema, movieUpdateSchema } from "../schemas";
import movieControllers from "../controllers/movie.controllers";

const movieRoutes: Router = Router();

movieRoutes.use(middlewares.verifyToken);

movieRoutes.post(
  "",
  middlewares.isAdmin,
  middlewares.validateBody(movieCreateSchema),
  movieControllers.createMovie
);
movieRoutes.get("", middlewares.pagination, movieControllers.getAllMovies);

movieRoutes.use("/:movieId", middlewares.verifyMovieIdExists);

movieRoutes.get("/:movieId", movieControllers.getMovieById);
movieRoutes.patch(
  "/:movieId",
  middlewares.isAdmin,
  middlewares.validateBody(movieUpdateSchema),
  movieControllers.updateMovie
);
movieRoutes.delete("/:movieId", middlewares.isAdmin, movieControllers.deleteMovie);

export default movieRoutes;
