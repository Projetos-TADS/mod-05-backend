import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import { DirectorAttributes, DirectorCreationAttributes } from "../interfaces";

export class DirectorModel
  extends Model<DirectorAttributes, DirectorCreationAttributes>
  implements DirectorAttributes
{
  public directorId!: string;
  public name!: string;
  public birthDate!: string;
  public nationality!: string;
}

DirectorModel.init(
  {
    directorId: {
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
    tableName: "directors",
    timestamps: true,
  }
);
