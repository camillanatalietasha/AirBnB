"use strict";
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    return queryInterface.bulkInsert(
      options,
      [
        {
          firstName: "Kevin",
          lastName: "Smith",
          email: "demo1@gmail.com",
          username: "ksmith",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          firstName: "Sarah",
          lastName: "Silverman",
          email: "ssilverman@gmail.com",
          username: "sarah123",
          hashedPassword: bcrypt.hashSync("password2"),
        },
        {
          firstName: "Jackie",
          lastName: "Bonsalle",
          email: "jackie@gmail.com",
          username: "jackieB",
          hashedPassword: bcrypt.hashSync("passwordF"),
        },
        {
          firstName: "Chris",
          lastName: "Washington",
          email: "christopher@gmail.com",
          username: "chrischrischris",
          hashedPassword: bcrypt.hashSync("password@"),
        },
        {
          firstName: "Jonathan",
          lastName: "Peel",
          email: "peel@gmail.com",
          username: "jono123",
          hashedPassword: bcrypt.hashSync("password3"),
        },
        {
          firstName: "Demo",
          lastName: "Lition",
          email: "demo@demo.com",
          username: "demo-lition",
          hashedPassword: bcrypt.hashSync("pass1234"),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        username: {
          [Op.in]: [
            "ksmith",
            "sarah123",
            "jackieB",
            "chrischrischris",
            "jono123",
          ],
        },
      },
      {}
    );
  },
};
