import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import { ActorAttributes, ActorCreationAttributes } from "../interfaces";
import { MovieModel } from "./Movie.model";

export class ActorModel
  extends Model<ActorAttributes, ActorCreationAttributes>
  implements ActorAttributes
{
  public actorId!: string;
  public name!: string;
  public birthDate!: string;
  public nationality!: string;
}

ActorModel.init(
  {
    actorId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    birthDate: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    nationality: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "actors",
    timestamps: true,
  }
);