import express from "express";
import sequelize from "./config/database";

const app = express();
const port = 3000;

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("The database has been successfully synchronized.");
  })
  .catch((error) => {
    console.log("Error:", error);
  });

app.listen(port, () => {
  console.log("Server is running on port: ", port);
});
