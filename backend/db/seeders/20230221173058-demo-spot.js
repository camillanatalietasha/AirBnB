"use strict";
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Spots";
    return queryInterface.bulkInsert(
      options,
      [
        {
          hostId: 1,
          address: "62 Space Station",
          city: "Voyager",
          state: "Copernican System",
          country: "Milky Way Galaxy",
          lat: 40.210831,
          lng: -105.286264,
          name: "Private room on new space station",
          description:
            "Ut illo quos et ullam dolor sed animi amet et magni quia eos eligendi eligendi aut repellat ullam. \n Sed odit incidunt qui iure internos ab nulla magnam et facere minus aut quia internos!",
          price: 125,
        },
        {
          hostId: 2,
          address: "1234 Twin Planet Rd",
          city: "Second City",
          state: "Venus",
          country: "Milky Way Galaxy",
          lat: 30.60075,
          lng: 36.859954,
          name: "Bungalow on Venus",
          description:
            "Vel sapiente dolor hic dolorem adipisci et velit neque. Aut reprehenderit molestias a laboriosam quia sed laborum perspiciatis sit quos sequi!!!  \n Non veritatis dolores est enim fuga rem molestiaeut laborum eveniet. Aut quia dolorem sed do eos culpa maiores.",
          price: 500,
        },
        {
          hostId: 3,
          address: "555 Rover St.",
          city: "Red City",
          state: "Mars",
          country: "Milky Way Galaxy",
          lat: 14.370286,
          lng: 103.806475,
          name: "Dome Glamping on Mars",
          description:
            "Rem tempora eveniet et atque voluptatum vel commodi quia. Aut enim  sed facere enim et repudiandae Quis ab alias optio. \n Ex dignissimos natus eum consectetur cumque sit ullam laboriosam quo accusantium consequuntur. ",
          price: 900,
        },
        {
          hostId: 5,
          address: "9876 Gangun Rd.",
          city: "Theed",
          state: "Naboo",
          country: "Chommell",
          lat: 40.69905,
          lng: -73.863638,
          name: "Entire Palace on Naboo",
          description:
            "Rem tempora eveniet et atque voluptatum vel commodi quia. Aut enim  sed facere enim et repudiandae Quis ab alias optio. Ex dignissimos natus eum consectetur cumque sit ullam laboriosam quo accusantium consequuntur. ",
          price: 600,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        name: {
          [Op.in]: [
            "Lyons Mountain Treehouse",
            "Chic Upper West Side Flat",
            "Beachfront in La Jolla",
          ],
        },
      },
      {}
    );
  },
};
