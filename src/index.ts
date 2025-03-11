import "express-async-errors";
import express, { Application } from "express";
import { setupSwagger } from "./config/swagger";
import routes from "./routes/";
import middlewares from "./middlewares";
import cors from "cors";

const app: Application = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/users", routes.userRoutes);
app.use("/login", routes.sessionRoutes);
app.use("/movies", routes.movieRoutes);
app.use("/favorites", routes.favoriteRoutes);
app.use("/actors", routes.actorRoutes);
app.use("/directors", routes.directorRoutes);
app.use("/cast", routes.castRoutes);
app.use("/directorMovie", routes.directorMovieRoutes);

app.use(middlewares.handleError);

setupSwagger(app);

export default app;
