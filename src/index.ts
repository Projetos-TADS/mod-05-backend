import "express-async-errors";
import express, { Application } from "express";
import { userRoutes } from "./routes/index";
import middlewares from "./middlewares";
import { sessionRoutes } from "./routes/session.routes";
import { movieRoutes } from "./routes/movie.routes";
import { favoriteRoutes } from "./routes/favorite.routes";
import { actorRoutes } from "./routes/actor.routes";

const app: Application = express();
app.use(express.json());
app.use("/users", userRoutes);
app.use("/login", sessionRoutes);
app.use("/movies", movieRoutes);
app.use("/favorites", favoriteRoutes);
app.use("/actors", actorRoutes);

app.use(middlewares.handleError);

export default app;
