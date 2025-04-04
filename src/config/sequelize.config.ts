import { Options } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const config: { [key: string]: Options } = {
  development: {
    database: process.env.DB_NAME || "mod_05_database",
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    dialect: "mysql",
    logging: false,
    dialectOptions: {
      decimalNumbers: true,
    },
  },
};

export = config;
