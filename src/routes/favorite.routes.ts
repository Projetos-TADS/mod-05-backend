import { Router } from "express";
import middlewares from "../middlewares";
import { movieCreateSchema, movieUpdateSchema } from "../schemas";
import movieControllers from "../controllers/movie.controllers";
import { favoriteCreateSchema } from "../schemas/favorite.schemas";
import { favoriteControllers } from "../controllers";

export const favoriteRoutes: Router = Router();

favoriteRoutes.use(middlewares.verifyToken);
favoriteRoutes.use("/:userId", middlewares.verifyUserIdExists);

favoriteRoutes.post("/:userId", favoriteControllers.createFavorite);
favoriteRoutes.get("/:userId", favoriteControllers.getAllFavoritesFromUser);

// favoriteRoutes.use("/:movieId", middlewares.verifyMovieIdExists);
// favoriteRoutes.get("/:movieId", middlewares.verifyToken, movieControllers.getMovieById);
// favoriteRoutes.delete("/:movieId", movieControllers.deleteMovie);
