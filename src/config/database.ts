import "dotenv/config";
import { Sequelize } from "sequelize";

const dataBaseURL: string | undefined | null = process.env.DATABASE_URL;

if (!dataBaseURL) throw new Error("Please provide a DATABASE_URL");

const sequelize: Sequelize = new Sequelize(dataBaseURL, {
  logging: false,
  dialectOptions: {
    decimalNumbers: true,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export default sequelize;
