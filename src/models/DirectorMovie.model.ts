import { DataTypes, Model } from "sequelize";
import { MovieModel } from "./Movie.model";
import sequelize from "../config/database";
import { DirectorModel } from "./Director.model";
import { DirectorMovieAttributes, DirectorMovieCreationAttributes } from "../interfaces";

export class DirectorMovieModel
  extends Model<DirectorMovieAttributes, DirectorMovieCreationAttributes>
  implements DirectorMovieAttributes
{
  public directorMovieId!: string;
  public directorId!: string;
  public movieId!: string;
  public addedDate!: Date;
  public description!: string;
}

DirectorMovieModel.init(
  {
    directorMovieId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    directorId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: DirectorModel,
        key: "directorId",
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
    addedDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "director_movie",
    timestamps: true,
  }
);

DirectorModel.belongsToMany(MovieModel, {
  through: DirectorMovieModel,
  foreignKey: "directorId",
  as: "movies",
});

DirectorModel.hasMany(DirectorMovieModel, {
  foreignKey: "directorId",
  as: "directorInstances",
});

MovieModel.belongsToMany(DirectorMovieModel, {
  through: DirectorMovieModel,
  foreignKey: "movieId",
  as: "directors",
});

MovieModel.hasMany(DirectorMovieModel, {
  foreignKey: "movieId",
  as: "directorMovieEntries",
});

DirectorMovieModel.belongsTo(MovieModel, {
  foreignKey: "movieId",
  as: "movie",
});

DirectorMovieModel.belongsTo(DirectorModel, {
  foreignKey: "directorId",
  as: "director",
});
