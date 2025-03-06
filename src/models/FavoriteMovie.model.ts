import { DataTypes, Model } from "sequelize";
import { UserModel } from "./User.model";
import { MovieModel } from "./Movie.model";
import sequelize from "../config/database";

interface FavoriteMovieAttributes {
  userId: string;
  movieId: string;
  addedDate: Date;
}

interface FavoriteMovieCreationAttributes extends FavoriteMovieAttributes {}

export class FavoriteMovie
  extends Model<FavoriteMovieAttributes, FavoriteMovieCreationAttributes>
  implements FavoriteMovieAttributes
{
  public userId!: string;
  public movieId!: string;
  public addedDate!: Date;
}

FavoriteMovie.init(
  {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: UserModel,
        key: "userId",
      },
    },
    movieId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
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
  },
  {
    sequelize,
    tableName: "favorite_movies",
    timestamps: false,
  }
);

UserModel.belongsToMany(MovieModel, {
  through: FavoriteMovie,
  foreignKey: "userId",
  as: "favorites",
}),
  MovieModel.belongsToMany(UserModel, {
    through: FavoriteMovie,
    foreignKey: "movieId",
    as: "admirers",
  });
