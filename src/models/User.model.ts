import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import bcrypt, { hashSync } from "bcryptjs";
import { UserAttributes, UserCreationAttributes } from "../interfaces";

export class UserModel
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public userId!: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public cpf!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt?: Date;
  public admin!: boolean;
}

UserModel.init(
  {
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: [3, 100],
      },
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: [6, 100],
      },
    },
    cpf: {
      type: DataTypes.STRING(11),
      allowNull: false,
      validate: {
        len: [11, 11],
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
    paranoid: true,
    modelName: "UserModel",
    hooks: {
      beforeCreate: async (user: UserModel) => {
        if (user.password) user.password = hashSync(user.password, 10);

        if (user.name) user.name = user.name.toLocaleLowerCase().trim();
        if (user.email) user.email = user.email.toLocaleLowerCase().trim();
      },
      beforeUpdate: async (user: UserModel) => {
        if (user.changed("password")) {
          const salt: string = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }

        if (user.name) user.name = user.name.toLocaleLowerCase().trim();
        if (user.email) user.email = user.email.toLocaleLowerCase().trim();
      },
    },
  }
);
