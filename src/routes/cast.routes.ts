import { Router } from "express";
import middlewares from "../middlewares";
import { castControllers } from "../controllers";
import { castCreateSchema } from "../schemas";

const castRoutes: Router = Router();

castRoutes.use(middlewares.verifyToken);

castRoutes.post(
  "",
  middlewares.isAdmin,
  middlewares.validateBody(castCreateSchema),
  middlewares.verifyActorIdExists,
  middlewares.verifyMovieIdExists,
  castControllers.addActorToMovie
);
castRoutes.delete(
  "/:castId",
  middlewares.isAdmin,
  middlewares.verifyCastIdExists,
  castControllers.removeActorFromMovie
);

export default castRoutes;
