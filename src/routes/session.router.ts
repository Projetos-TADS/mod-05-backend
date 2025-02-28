import { Router } from "express";
import middlewares from "../middlewares";
import { sessionSchema } from "../schemas";
import { sessionController } from "../controllers";

export const sessionRouter: Router = Router();

sessionRouter.post("", middlewares.validateBody(sessionSchema), sessionController.createSession);
