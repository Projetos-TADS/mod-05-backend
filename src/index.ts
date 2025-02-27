import express from "express";
import sequelize from "./config/database";
import UserModel from "./models/UserModel";

const app = express();
const port = 3000;
app.use(express.json());

app.get("/users", async (req, res) => {
  const users = await UserModel.findAll();
  res.send(users);
});

app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findByPk(id);
  if (!user) {
    res.status(404).send("User not found.");
  }
  res.send(user);
});

app.post("/users", async (req, res) => {
  const { name, email, password, admin } = req.body;
  const user = await UserModel.create({ name, email, password, admin });
  res.send(user);
});

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
