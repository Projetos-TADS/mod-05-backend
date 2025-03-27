import { Router } from "express";
import middlewares from "../middlewares";
import { castControllers } from "../controllers";
import { castCreateSchema } from "../schemas";
import { criarCastEmMassa } from "../controllers/CRIAEMMASSA.controllers";

const castRoutes: Router = Router();

castRoutes.post("/add", criarCastEmMassa);

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
