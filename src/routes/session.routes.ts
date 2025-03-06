import { Router } from "express";
import middlewares from "../middlewares";
import { sessionSchema } from "../schemas";
import { sessionController } from "../controllers";

export const sessionRoutes: Router = Router();

sessionRoutes.post("", middlewares.validateBody(sessionSchema), sessionController.createSession);
