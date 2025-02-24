import { Sequelize } from "sequelize";

const sequelize = new Sequelize("mod_05_database", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
