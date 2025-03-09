import { Router } from "express";
import middlewares from "../middlewares";
import { castControllers } from "../controllers";
import { castCreateSchema } from "../schemas";

export const castRoutes: Router = Router();

castRoutes.use(middlewares.verifyToken);

castRoutes.post(
  "",
  middlewares.isAdmin,
  middlewares.validateBody(castCreateSchema),
  middlewares.verifyActorIdExists,
  middlewares.verifyMovieIdExists,
  castControllers.addActorToMovie
);
// castRoutes.get("/:movieId", middlewares.verifyMovieIdExists, castControllers.getAllMovieActors);
castRoutes.delete(
  "/:castId",
  middlewares.isAdmin,
  middlewares.verifyCastIdExists,
  castControllers.removeActorFromMovie
);
