'use strict';
const bcrypt = require("bcryptjs");

// options object
let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
        {
            firstName: 'Kevin',
            lastName: 'Smith',
            email: 'demo1@gmail.com',
            username: 'ksmith',
            hashedPassword: bcrypt.hashSync('password')
        },
        {
            firstName: 'Sarah',
            lastName: 'Silverman',
            email: 'ssilverman@gmail.com',
            username: 'sarah123',
            hashedPassword: bcrypt.hashSync('password2')
        },
        {
            firstName: 'Jackie',
            lastName: 'Bonsalle',
            email: 'jackie@gmail.com',
            username: 'jackieB',
            hashedPassword: bcrypt.hashSync('passwordF')
        },
        {
            firstName: 'Chris',
            lastName: 'Washington',
            email: 'christopher@gmail.com',
            username: 'chrischrischris',
            hashedPassword: bcrypt.hashSync('password@')
        },
        {
            firstName: 'Jonathan',
            lastName: 'Peel',
            email: 'peel@gmail.com',
            username: 'jono123',
            hashedPassword: bcrypt.hashSync('password3')
        },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
        userName: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2']}
    }, {});
  }
};
