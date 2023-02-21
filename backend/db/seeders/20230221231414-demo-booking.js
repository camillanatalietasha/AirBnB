"use strict";
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Bookings";
    return queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          userId: 5,
          startDate: "2023-04-19",
          endDate: "2023-04-25"
        },
        {
          spotId: 2,
          userId: 1,
          startDate: "2023-06-15",
          endDate: "2023-06-22"
        },
        {
          spotId: 3,
          userId: 3,
          startDate: "2023-08-10",
          endDate: "2023-08-15"
        },
      ],
      {}
    );
  },
  down: async (queryInterface, Sequelize) => {
    options.tableName = "Bookings";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        endDate: {
          [Op.in]: ["2023-04-25", "2023-06-22", "2023-08-15"],
        },
      },
      {}
    );
  },
};
