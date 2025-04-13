"use strict";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

interface UserData {
  userId: string;
  name: string;
  email: string;
  password: string;
  cpf: string;
  admin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

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
        userId: uuidv4(),
        name: "Lucas",
        email: "lucas@mail.com",
        password: await bcrypt.hash("123456", saltRounds),
        cpf: "89499635076",
        admin: false,
        createdAt: now,
        updatedAt: now,
      },
      {
        userId: uuidv4(),
        name: "Mariana",
        email: "mariana@mail.com",
        password: await bcrypt.hash("abcdef", saltRounds),
        cpf: "23711464041",
        admin: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        userId: uuidv4(),
        name: "Thiago",
        email: "thiago@mail.com",
        password: await bcrypt.hash("thiagopwd", saltRounds),
        cpf: "62842214013",
        admin: false,
        createdAt: now,
        updatedAt: now,
      },
      {
        userId: uuidv4(),
        name: "Camila",
        email: "camila@mail.com",
        password: await bcrypt.hash("senha789", saltRounds),
        cpf: "51039941001",
        admin: false,
        createdAt: now,
        updatedAt: now,
      },
      {
        userId: uuidv4(),
        name: "Rafael",
        email: "rafael@mail.com",
        password: await bcrypt.hash("pass123", saltRounds),
        cpf: "20739842072",
        admin: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        userId: uuidv4(),
        name: "Bia",
        email: "bia@mail.com",
        password: await bcrypt.hash("123bia", saltRounds),
        cpf: "39262185090",
        admin: false,
        createdAt: now,
        updatedAt: now,
      },
      {
        userId: uuidv4(),
        name: "Laura",
        email: "laura@mail.com",
        password: await bcrypt.hash("laurapass", saltRounds),
        cpf: "83996888007",
        admin: false,
        createdAt: now,
        updatedAt: now,
      },
      {
        userId: uuidv4(),
        name: "Felipe",
        email: "felipe@mail.com",
        password: await bcrypt.hash("felipesenha", saltRounds),
        cpf: "81685385010",
        admin: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        userId: uuidv4(),
        name: "Sofia",
        email: "sofia@mail.com",
        password: await bcrypt.hash("sofiapwd", saltRounds),
        cpf: "37290600070",
        admin: false,
        createdAt: now,
        updatedAt: now,
      },
      {
        userId: uuidv4(),
        name: "Victor",
        email: "victor@mail.com",
        password: await bcrypt.hash("vic123", saltRounds),
        cpf: "54454556024",
        admin: false,
        createdAt: now,
        updatedAt: now,
      },
    ];

    const transaction = await queryInterface.sequelize.transaction();

    try {
      const BATCH_SIZE = 50;
      for (let i = 0; i < usersData.length; i += BATCH_SIZE) {
        const batch = usersData.slice(i, i + BATCH_SIZE);
        await queryInterface.bulkInsert("users", batch, { transaction });
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(
    queryInterface: import("sequelize").QueryInterface,
    Sequelize: typeof import("sequelize")
  ) {
    await queryInterface.bulkDelete("users", {}, {});
  },
};
