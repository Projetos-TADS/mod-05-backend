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
      "Directors",
      [
        {
          directorId: uuidv4(),
          name: "Steven Spielberg",
          birthDate: "1946-12-18",
          nationality: "Americano",
          createdAt: now,
          updatedAt: now,
        },
        {
          directorId: uuidv4(),
          name: "Martin Scorsese",
          birthDate: "1942-11-17",
          nationality: "Americano",
          createdAt: now,
          updatedAt: now,
        },
        {
          directorId: uuidv4(),
          name: "Christopher Nolan",
          birthDate: "1970-07-30",
          nationality: "Britânico",
          createdAt: now,
          updatedAt: now,
        },
        {
          directorId: uuidv4(),
          name: "Quentin Tarantino",
          birthDate: "1963-03-27",
          nationality: "Americano",
          createdAt: now,
          updatedAt: now,
        },
        {
          directorId: uuidv4(),
          name: "Alfred Hitchcock",
          birthDate: "1899-08-13",
          nationality: "Britânico",
          createdAt: now,
          updatedAt: now,
        },
        {
          directorId: uuidv4(),
          name: "Hayao Miyazaki",
          birthDate: "1941-01-05",
          nationality: "Japonês",
          createdAt: now,
          updatedAt: now,
        },
        {
          directorId: uuidv4(),
          name: "Francis Ford Coppola",
          birthDate: "1939-04-07",
          nationality: "Americano",
          createdAt: now,
          updatedAt: now,
        },
        {
          directorId: uuidv4(),
          name: "James Cameron",
          birthDate: "1954-08-16",
          nationality: "Canadense",
          createdAt: now,
          updatedAt: now,
        },
        {
          directorId: uuidv4(),
          name: "Ridley Scott",
          birthDate: "1937-11-30",
          nationality: "Britânico",
          createdAt: now,
          updatedAt: now,
        },
        {
          directorId: uuidv4(),
          name: "Peter Jackson",
          birthDate: "1961-10-31",
          nationality: "Neozelandês",
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
    await queryInterface.bulkDelete("Directors", {}, {});
  },
};
