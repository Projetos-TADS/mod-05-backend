import "express-async-errors";
import express, { Application } from "express";
import { userRoutes } from "./routes/index";
import middlewares from "./middlewares";
import { sessionRouter } from "./routes/session.router";

const app: Application = express();
app.use(express.json());
app.use("/users", userRoutes);
app.use("/login", sessionRouter);

app.use(middlewares.handleError);

export default app;
