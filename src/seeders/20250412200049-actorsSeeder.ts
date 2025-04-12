"use strict";
import { v4 as uuidv4 } from "uuid";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(
    queryInterface: import("sequelize").QueryInterface,
    Sequelize: typeof import("sequelize")
  ) {
    const now = new Date();

    await queryInterface.bulkInsert(
      "actors",
      [
        {
          actorId: uuidv4(),
          name: "Leonardo DiCaprio",
          birthDate: "1974-11-11",
          nationality: "Americano",
          createdAt: now,
          updatedAt: now,
        },
        {
          actorId: uuidv4(),
          name: "Meryl Streep",
          birthDate: "1949-06-22",
          nationality: "Americana",
          createdAt: now,
          updatedAt: now,
        },
        {
          actorId: uuidv4(),
          name: "Denzel Washington",
          birthDate: "1954-12-28",
          nationality: "Americano",
          createdAt: now,
          updatedAt: now,
        },
        {
          actorId: uuidv4(),
          name: "Scarlett Johansson",
          birthDate: "1984-11-22",
          nationality: "Americana",
          createdAt: now,
          updatedAt: now,
        },
        {
          actorId: uuidv4(),
          name: "Robert De Niro",
          birthDate: "1943-08-17",
          nationality: "Americano",
          createdAt: now,
          updatedAt: now,
        },
        {
          actorId: uuidv4(),
          name: "Cate Blanchett",
          birthDate: "1969-05-14",
          nationality: "Australiana",
          createdAt: now,
          updatedAt: now,
        },
        {
          actorId: uuidv4(),
          name: "Morgan Freeman",
          birthDate: "1937-06-01",
          nationality: "Americano",
          createdAt: now,
          updatedAt: now,
        },
        {
          actorId: uuidv4(),
          name: "Emma Watson",
          birthDate: "1990-04-15",
          nationality: "Britânica",
          createdAt: now,
          updatedAt: now,
        },
        {
          actorId: uuidv4(),
          name: "Tom Hanks",
          birthDate: "1956-07-09",
          nationality: "Americano",
          createdAt: now,
          updatedAt: now,
        },
        {
          actorId: uuidv4(),
          name: "Natalie Portman",
          birthDate: "1981-06-09",
          nationality: "Israelense-Americana",
          createdAt: now,
          updatedAt: now,
        },
      ],
      {}
    );
  },

  async down(
    queryInterface: import("sequelize").QueryInterface,
    Sequelize: typeof import("sequelize")
  ) {
    await queryInterface.bulkDelete("Actors", {}, {});
  },
};
