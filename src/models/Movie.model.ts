import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import { MovieAttributes, MovieCreationAttributes } from "../interfaces";
import { ActorModel } from "./Actor.model";
import { DirectorModel } from "./Director.model";

export class MovieModel
  extends Model<MovieAttributes, MovieCreationAttributes>
  implements MovieAttributes
{
  public movieId!: string;
  public title!: string;
  public description!: string;
  public releaseYear!: number;
  public duration!: number;
  public rating!: number;
  public urlImage!: string;
  public directorId!: string;
}

MovieModel.init(
  {
    movieId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    releaseYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.DECIMAL(3, 1),
      defaultValue: 0.0,
    },
    urlImage: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    directorId: {
      type: DataTypes.UUID,
      references: {
        model: DirectorModel,
        key: "directorId",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    },
  },
  {
    sequelize,
    tableName: "movies",
    timestamps: false,
  }
);

MovieModel.belongsTo(DirectorModel, {
  foreignKey: "directorId",
  as: "director",
});
