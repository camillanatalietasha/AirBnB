"use strict";
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "SpotImages";
    return queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          imgUrl: "assets/spot-images/spot1-lyons-treehouse-main.png",
          isPreview: true,
        },
        {
          spotId: 1,
          imgUrl: "assets/spot-images/spot1-lyons-treehouse-extra.png",
          isPreview: false,
        },
        {
          spotId: 2,
          imgUrl: "assets/spot-images/spot2-sd-main",
          isPreview: true,
        },
        {
          spotId: 2,
          imgUrl: "assets/spot-images/spot2-sd-extra",
          isPreview: false,
        },
        {
          spotId: 2,
          imgUrl: "assets/spot-images/spot2-sd-extra2",
          isPreview: false,
        },
        {
          spotId: 3,
          imgUrl: "assets/spot-images/spot3-nyc-main.png",
          isPreview: true,
        },
        {
          spotId: 3,
          imgUrl: "assets/spot-images/spot3-nyc-extra.png",
          isPreview: false,
        },
        {
          spotId: 3,
          imgUrl: "assets/spot-images/spot3-nyc-extra2.png",
          isPreview: true,
        },
      ],
      {}
    );
  },
  down: async (queryInterface, Sequelize) => {
    options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        id: {
          [Op.in]: [1,2,3,4,5,6,7,8],
        },
      },
      {}
    );
  },
};
