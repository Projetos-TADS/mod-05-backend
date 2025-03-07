import { Router } from "express";
import middlewares from "../middlewares";
import { favoriteControllers } from "../controllers";
import { favoriteCreateSchema } from "../schemas/favorite.schemas";

export const favoriteRoutes: Router = Router();

favoriteRoutes.use(middlewares.verifyToken);

favoriteRoutes.post(
  "/:userId",
  middlewares.validateBody(favoriteCreateSchema),
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
