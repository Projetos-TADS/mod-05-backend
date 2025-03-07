import { Router } from "express";
import middlewares from "../middlewares";
import { favoriteControllers } from "../controllers";

export const favoriteRoutes: Router = Router();

favoriteRoutes.use(middlewares.verifyToken);

favoriteRoutes.post(
  "/:userId",
  middlewares.verifyUserIdExists,
  middlewares.verifyMovieIdExists,
  favoriteControllers.createFavorite
);
favoriteRoutes.get(
  "/:userId",
  middlewares.verifyUserIdExists,
  favoriteControllers.getAllFavoritesFromUser
);

// favoriteRoutes.get("/:favoriteId", middlewares.verifyUserIdExists, movieControllers.getMovieById);
// favoriteRoutes.delete("/:favoriteId", movieControllers.deleteMovie);
