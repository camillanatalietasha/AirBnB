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
          imgUrl: "https://i.imgur.com/333DuPH.png",
          isPreview: true,
        },
        {
          spotId: 1,
          imgUrl: "https://i.imgur.com/oMX5SLw.png",
          isPreview: false,
        },
        {
          spotId: 1,
          imgUrl: "https://i.imgur.com/EtHbjWu.png",
          isPreview: false,
        },
        {
          spotId: 1,
          imgUrl: "https://i.imgur.com/hYFmNke.png",
          isPreview: false,
        },
        {
          spotId: 1,
          imgUrl: "https://i.imgur.com/XFhRAQ8.png",
          isPreview: false,
        },
        {
          spotId: 2,
          imgUrl: "https://i.imgur.com/kNuhocE.png",
          isPreview: true,
        },
        {
          spotId: 2,
          imgUrl: "https://i.imgur.com/lGsaRVQ.png",
          isPreview: false,
        },
        {
          spotId: 2,
          imgUrl: "https://i.imgur.com/DuBQD4z.png",
          isPreview: false,
        },
        {
          spotId: 2,
          imgUrl: "https://i.imgur.com/FSyF1zQ.png",
          isPreview: false,
        },
        {
          spotId: 2,
          imgUrl: "https://i.imgur.com/ZpgMEIk.png",
          isPreview: false,
        },
        {
          spotId: 3,
          imgUrl: "https://i.imgur.com/M68VYcT.png",
          isPreview: true,
        },
        {
          spotId: 3,
          imgUrl: "https://i.imgur.com/yspcMo0.png",
          isPreview: false,
        },
        {
          spotId: 3,
          imgUrl: "https://i.imgur.com/NdvpVR4.png",
          isPreview: false,
        },
        {
          spotId: 3,
          imgUrl: "https://i.imgur.com/8en78gP.jpg",
          isPreview: false,
        },
        {
          spotId: 3,
          imgUrl: "https://i.imgur.com/6dergR5.jpg",
          isPreview: false,
        },
        {
          spotId: 4,
          imgUrl: "https://i.imgur.com/5dam495.png",
          isPreview: true,
        },
        {
          spotId: 4,
          imgUrl: "https://i.imgur.com/srndeYw.jpg",
          isPreview: false,
        },
        {
          spotId: 4,
          imgUrl: "https://i.imgur.com/8alXCSY.jpg",
          isPreview: false,
        },
        {
          spotId: 4,
          imgUrl: "https://i.imgur.com/zzhC9Nm.jpg",
          isPreview: false,
        },
        {
          spotId: 4,
          imgUrl: "https://i.imgur.com/h7rZh45.jpg",
          isPreview: false,
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
