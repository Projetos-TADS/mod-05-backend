import "dotenv/config";
import { Sequelize } from "sequelize";

const dataBaseURL: string | undefined = process.env.DATABASE_URL;

if (!dataBaseURL) {
  throw new Error("Please provide a DATABASE_URL");
}

const sequelize = new Sequelize(dataBaseURL, {
  logging: false,
});

export default sequelize;
