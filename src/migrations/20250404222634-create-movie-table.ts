"use strict";
import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: typeof DataTypes) => {
    await queryInterface.createTable("movies", {
      movieId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      releaseYear: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      rating: {
        type: Sequelize.DECIMAL(3, 1),
        defaultValue: 0.0,
      },
      urlImage: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
    });
  },

  down: async (queryInterface: QueryInterface, Sequelize: typeof DataTypes) => {
    await queryInterface.dropTable("movies");
  },
};
