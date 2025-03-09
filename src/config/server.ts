import app from "..";
import sequelize from "./database";

sequelize
  .sync({ force: false })
  .then(() => {
    const PORT: number = Number(process.env.PORT || 3000);
    console.log("The database has been successfully synchronized.");
    app.listen(PORT, () => console.log("Server is running on port: ", PORT));
  })
  .catch((error) => console.error(error));
