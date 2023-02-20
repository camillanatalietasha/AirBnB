"use strict";
let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn("Users", "lastName", {
      type: Sequelize.STRING,
    }, options);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("Users", "lastName");
  },
};
