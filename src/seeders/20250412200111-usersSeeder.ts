"use strict";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(
    queryInterface: import("sequelize").QueryInterface,
    Sequelize: typeof import("sequelize")
  ) {
    const now = new Date();
    const saltRounds = 10;

    const usersData = [
      {
        name: "Lucas",
        email: "lucas@mail.com",
        password: await bcrypt.hash("123456", saltRounds),
        cpf: "89499635076",
        admin: false,
      },
      {
        name: "Mariana",
        email: "mariana@mail.com",
        password: await bcrypt.hash("abcdef", saltRounds),
        cpf: "23711464041",
        admin: true,
      },
      {
        name: "Thiago",
        email: "thiago@mail.com",
        password: await bcrypt.hash("thiagopwd", saltRounds),
        cpf: "62842214013",
        admin: false,
      },
      {
        name: "Camila",
        email: "camila@mail.com",
        password: await bcrypt.hash("senha789", saltRounds),
        cpf: "51039941001",
        admin: false,
      },
      {
        name: "Rafael",
        email: "rafael@mail.com",
        password: await bcrypt.hash("pass123", saltRounds),
        cpf: "20739842072",
        admin: true,
      },
      {
        name: "Bia",
        email: "bia@mail.com",
        password: await bcrypt.hash("123bia", saltRounds),
        cpf: "39262185090",
        admin: false,
      },
      {
        name: "Laura",
        email: "laura@mail.com",
        password: await bcrypt.hash("laurapass", saltRounds),
        cpf: "83996888007",
        admin: false,
      },
      {
        name: "Felipe",
        email: "felipe@mail.com",
        password: await bcrypt.hash("felipesenha", saltRounds),
        cpf: "81685385010",
        admin: true,
      },
      {
        name: "Sofia",
        email: "sofia@mail.com",
        password: await bcrypt.hash("sofiapwd", saltRounds),
        cpf: "37290600070",
        admin: false,
      },
      {
        name: "Victor",
        email: "victor@mail.com",
        password: await bcrypt.hash("vic123", saltRounds),
        cpf: "54454556024",
        admin: false,
      },
    ];

    await queryInterface.bulkInsert(
      "users",
      usersData.map((user) => ({
        userId: uuidv4(),
        ...user,
        createdAt: now,
        updatedAt: now,
      })),
      {}
    );
  },

  async down(
    queryInterface: import("sequelize").QueryInterface,
    Sequelize: typeof import("sequelize")
  ) {
    await queryInterface.bulkDelete("Users", {}, {});
  },
};
