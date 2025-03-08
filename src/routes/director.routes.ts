import { Router } from "express";
import middlewares from "../middlewares";
import { directorCreateSchema, directorUpdateSchema } from "../schemas";
import directorControllers from "../controllers/director.controllers";

export const directorRoutes: Router = Router();

directorRoutes.use(middlewares.verifyToken);

directorRoutes.post(
  "",
  middlewares.isAdmin,
  middlewares.validateBody(directorCreateSchema),
  directorControllers.createDirector
);
directorRoutes.get("", directorControllers.getAllDirectors);

directorRoutes.use("/:directorId", middlewares.verifyDirectorIdExists);

directorRoutes.get("/:directorId", directorControllers.getDirectorById);
directorRoutes.patch(
  "/:directorId",
  middlewares.isAdmin,
  middlewares.validateBody(directorUpdateSchema),
  directorControllers.updateDirector
);
directorRoutes.delete("/:directorId", middlewares.isAdmin, directorControllers.deleteDirector);
