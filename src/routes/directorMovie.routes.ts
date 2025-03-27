import { Router } from "express";
import middlewares from "../middlewares";
import { directorMovieCreateSchema } from "../schemas";
import { directorMovieControllers } from "../controllers";
import { addDiretoresEmMassa } from "../controllers/CRIAEMMASSA.controllers";

const directorMovieRoutes: Router = Router();

directorMovieRoutes.post("/add", addDiretoresEmMassa);

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

export default directorMovieRoutes;
