"use strict";
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Reviews";
    return queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          userId: 1,
          review:
            "Eum dicta voluptatibus non tempore rerum 33. earum expedita ex praesentium libero eos temporibus nemo At accusantium fugiat! :)",
          stars: 5,
        },
        {
          spotId: 2,
          userId: 4,
          review:
            "Eum dicta voluptatibus non tempore rerum 33. earum expedita ex praesentium libero eos temporibus nemo At accusantium fugiat! :|",
          stars: 3,
        },
        {
          spotId: 3,
          userId: 3,
          review:
            "Eum dicta voluptatibus non tempore rerum 33. earum expedita ex praesentium libero eos temporibus nemo At accusantium fugiat! :(",
          stars: 1,
        },
      ],
      {}
    );
  },
  down: async (queryInterface, Sequelize) => {
    options.tableName = "Reviews";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        spotId: {
          [Op.in]: [1, 2, 3],
        },
      },
      {}
    );
  },
};
