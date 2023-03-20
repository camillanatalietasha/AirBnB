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
          state: "Copernican",
          country: "Milky Way Galaxy",
          lat: 40.210831,
          lng: -105.286264,
          name: "Private room on new space station",
          description:
            "Ut illo quos et ullam dolor sed animi amet et magni quia eos eligendi eligendi aut repellat ullam. Sed odit incidunt qui iure internos ab nulla magnam et facere minus aut quia internos! \n Non veniam maxime qui soluta ipsum sit enim voluptatem. Ut ratione placeat At quaerat similique et necessitatibus soluta eos dolorem nihil ea officiis obcaecati est porro modi est aliquam voluptatibus. 33 maiores facilis ut eveniet asperiores sit optio architecto est facere sint ea quam maiores.",
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
            "Vel sapiente dolor hic dolorem adipisci et velit neque. Aut reprehenderit molestias a laboriosam quia sed laborum perspiciatis sit quos sequi!!!  \n Non veritatis dolores est enim fuga rem molestiaeut laborum eveniet. Aut quia dolorem sed do eos culpa maiores. Est quos eligendi et dicta nobis sit inventore dolorum et dolores esse. Vel dolores beatae et error galisum est culpa enim ab voluptatem labore et consectetur illo est vitae recusandae. Ut laborum totam 33 exercitationem sint ea quas beatae sed omnis voluptas.",
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
            "Rem tempora eveniet et atque voluptatum vel commodi quia. Aut enim  sed facere enim et repudiandae Quis ab alias optio. \n Ex dignissimos natus eum consectetur cumque sit ullam laboriosam quo accusantium consequuntur. Lorem ipsum dolor sit amet. Quo aperiam magnam qui voluptatem magni non placeat debitis et dignissimos sunt 33 illo architecto qui asperiores assumenda eum iste repudiandae. A sunt magni est provident magnam sed veniam nihil aut Quis placeat aut accusamus voluptatem qui recusandae esse id dolore deleniti. ",
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
            "Rem tempora eveniet et atque voluptatum vel commodi quia. Aut enim  sed facere enim et repudiandae Quis ab alias optio. Ex dignissimos natus eum consectetur cumque sit ullam laboriosam quo accusantium consequuntur. \n Non veniam maxime qui soluta ipsum sit enim voluptatem. Ut ratione placeat At quaerat similique et necessitatibus soluta eos dolorem nihil ea officiis obcaecati est porro modi est aliquam voluptatibus. 33 maiores facilis ut eveniet asperiores sit optio architecto est facere sint ea quam maiores.",
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
            "Private room on new space station",
            "Bungalow on Venus",
            "Dome Glamping on Mars",
            "Entire Palace on Naboo",
          ],
        },
      },
      {}
    );
  },
};
