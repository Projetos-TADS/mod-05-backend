import { Router } from "express";
import middlewares from "../middlewares";
import { favoriteControllers } from "../controllers";

const favoriteRoutes: Router = Router();

favoriteRoutes.use(middlewares.verifyToken);

favoriteRoutes.post(
  "/:movieId/:userId",
  middlewares.verifyUserIdExists,
  middlewares.verifyMovieIdExists,
  favoriteControllers.createFavorite
);

favoriteRoutes.get(
  "/all/:userId",
  middlewares.verifyUserIdExists,
  favoriteControllers.getAllFavoritesFromUser
);

favoriteRoutes.get(
  "/:favoriteId",
  middlewares.verifyFavoriteIdExists,
  favoriteControllers.getFavoriteById
);

favoriteRoutes.delete(
  "/:favoriteId",
  middlewares.verifyFavoriteIdExists,
  favoriteControllers.deleteFavorite
);

export default favoriteRoutes;
