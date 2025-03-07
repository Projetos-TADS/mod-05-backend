import { DataTypes, Model } from "sequelize";
import { MovieModel } from "./Movie.model";
import sequelize from "../config/database";
import { ActorModel } from "./Actor.model";
import { ActorMovieAttributes, ActorMovieCreationAttributes } from "../interfaces";

export class ActorMovieModel
  extends Model<ActorMovieAttributes, ActorMovieCreationAttributes>
  implements ActorMovieAttributes
{
  public actorMovieId!: string;
  public actorId!: string;
  public movieId!: string;
}

ActorMovieModel.init(
  {
    actorMovieId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    actorId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: ActorModel,
        key: "actorId",
      },
    },
    movieId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: MovieModel,
        key: "movieId",
      },
    },
  },
  {
    sequelize,
    tableName: "movie_actors",
    timestamps: true,
  }
);

MovieModel.belongsToMany(ActorModel, {
  through: ActorMovieModel,
  foreignKey: "movieId",
  as: "actors",
});

ActorModel.belongsToMany(MovieModel, {
  through: ActorMovieModel,
  foreignKey: "actorId",
  as: "movies",
});
