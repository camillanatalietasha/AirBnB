'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
        'Users', 
        'firstName', 
        {
            type: Sequelize.STRING,
        })
  },

  async down (queryInterface, Sequelize) { 
    return queryInterface.removeColumn(
        'Users',
        'firstName'
    )
  }
};
