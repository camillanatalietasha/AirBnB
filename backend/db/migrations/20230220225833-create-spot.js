"use strict";
/** @type {import('sequelize-cli').Migration} */

// options object
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Spots",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
          unique: true,
        },
        hostId: {
          allowNull: false,
          onDelete: "CASCADE",
          type: Sequelize.INTEGER,
          references: { model: "Users", key: "id" },
        },
        address: {
          allowNull: false,
          type: Sequelize.STRING(50),
        },
        city: {
          allowNull: false,
          type: Sequelize.STRING(30),
        },
        state: {
          allowNull: false,
          type: Sequelize.STRING(30),
        },
        country: {
          allowNull: false,
          type: Sequelize.STRING(30),
        },
        lat: {
          allowNull: true,
          type: Sequelize.DECIMAL,
        },
        lng: {
          allowNull: true,
          type: Sequelize.DECIMAL,
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING(50),
        },
        description: {
          allowNull: false,
          type: Sequelize.TEXT,
        },
        price: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      options
    );
  },
  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    return queryInterface.dropTable("Spots");
  },
};
