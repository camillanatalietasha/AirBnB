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
          hostId: 3,
          address: "123 Treehouse Way",
          city: "Lyons",
          state: "Colorado",
          country: "United States",
          lat: 40.210831,
          lng: -105.286264,
          name: "Lyons Mountain Treehouse",
          description:
            "Ut illo quos et ullam dolor sed animi amet et magni quia eos eligendi eligendi aut repellat ullam. \n Sed odit incidunt qui iure internos ab nulla magnam et facere minus aut quia internos!",
          price: 125,
        },
        {
          hostId: 4,
          address: "54 W 88th St",
          city: "New York",
          state: "New York",
          country: "United States",
          lat: 40.787411,
          lng: -73.970700,
          name: "Chic Upper West Side Flat",
          description:
            "Vel sapiente dolor hic dolorem adipisci et velit neque. Aut reprehenderit molestias a laboriosam quia sed laborum perspiciatis sit quos sequi!!!  \n Non veritatis dolores est enim fuga rem molestiaeut laborum eveniet. Aut quia dolorem sed do eos culpa maiores.",
          price: 500,
        },
        {
          hostId: 2,
          address: "555 Torrey Pines Road",
          city: "San Diego",
          state: "California",
          country: "United States",
          lat: 32.830628,
          lng: -117.279604,
          name: "Beachfront in La Jolla",
          description:
            "Rem tempora eveniet et atque voluptatum vel commodi quia. Aut enim  sed facere enim et repudiandae Quis ab alias optio. \n Ex dignissimos natus eum consectetur cumque sit ullam laboriosam quo accusantium consequuntur. ",
          price: 900,
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
