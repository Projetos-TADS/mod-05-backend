import { Router } from "express";
import middlewares from "../middlewares";
import { actorCreateSchema, actorUpdateSchema } from "../schemas";
import { actorControllers } from "../controllers";

export const actorRoutes: Router = Router();

actorRoutes.use(middlewares.verifyToken);

actorRoutes.post("", middlewares.validateBody(actorCreateSchema), actorControllers.createActor);
actorRoutes.get("", actorControllers.getAllActors);

actorRoutes.use("/:actorId", middlewares.verifyActorIdExists);

actorRoutes.get("/:actorId", actorControllers.getActorById);
actorRoutes.patch(
  "/:actorId",
  middlewares.validateBody(actorUpdateSchema),
  actorControllers.updateActor
);
actorRoutes.delete("/:actorId", actorControllers.deleteActor);
