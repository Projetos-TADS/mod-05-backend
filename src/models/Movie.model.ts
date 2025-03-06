import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import { MovieAttributes, MovieCreationAttributes } from "../interfaces";

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
  },
  {
    sequelize,
    tableName: "movies",
    timestamps: false,
  }
);
