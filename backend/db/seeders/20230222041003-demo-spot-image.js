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
          imgUrl:
            "https://res.cloudinary.com/dvduszbet/image/upload/v1679208931/spacebnb/docs/Screenshot_2023-03-14_at_10.26.09_PM_rqunem.png",
          isPreview: true,
        },
        {
          spotId: 1,
          imgUrl:
            "https://res.cloudinary.com/dvduszbet/image/upload/v1679208931/spacebnb/docs/Screenshot_2023-03-14_at_10.26.15_PM_tqgams.png",
          isPreview: false,
        },
        {
          spotId: 1,
          imgUrl:
            "https://res.cloudinary.com/dvduszbet/image/upload/v1679208930/spacebnb/docs/Screenshot_2023-03-14_at_10.26.38_PM_ic9pbt.png",
          isPreview: false,
        },
        {
          spotId: 1,
          imgUrl:
            "https://res.cloudinary.com/dvduszbet/image/upload/v1679208930/spacebnb/docs/Screenshot_2023-03-14_at_10.26.23_PM_qiza4g.png",
          isPreview: false,
        },
        {
          spotId: 1,
          imgUrl:
            "https://res.cloudinary.com/dvduszbet/image/upload/v1679208930/spacebnb/docs/Screenshot_2023-03-14_at_10.26.00_PM_d9uj1l.png",
          isPreview: false,
        },
        {
          spotId: 2,
          imgUrl:
            "https://res.cloudinary.com/dvduszbet/image/upload/v1679208934/spacebnb/docs/venus2_g4jx2k.png",
          isPreview: true,
        },
        {
          spotId: 2,
          imgUrl:
            "https://res.cloudinary.com/dvduszbet/image/upload/v1679208935/spacebnb/docs/venus5_ivge36.png",
          isPreview: false,
        },
        {
          spotId: 2,
          imgUrl:
            "https://res.cloudinary.com/dvduszbet/image/upload/v1679208935/spacebnb/docs/venus4_hj1pvk.png",
          isPreview: false,
        },
        {
          spotId: 2,
          imgUrl:
            "https://res.cloudinary.com/dvduszbet/image/upload/v1679208938/spacebnb/docs/venus3_mfcw33.png",
          isPreview: false,
        },
        {
          spotId: 2,
          imgUrl:
            "https://res.cloudinary.com/dvduszbet/image/upload/v1679208938/spacebnb/docs/venus1_p4bb21.png",
          isPreview: false,
        },
        {
          spotId: 3,
          imgUrl:
            "https://res.cloudinary.com/dvduszbet/image/upload/v1679208936/spacebnb/docs/marsprev_drqdtq.png",
          isPreview: true,
        },
        {
          spotId: 3,
          imgUrl:
            "https://res.cloudinary.com/dvduszbet/image/upload/v1679208932/spacebnb/docs/mars2_upztd4.png",
          isPreview: false,
        },
        {
          spotId: 3,
          imgUrl:
            "https://res.cloudinary.com/dvduszbet/image/upload/v1679208939/spacebnb/docs/mars3_meb5vr.jpg",
          isPreview: false,
        },
        {
          spotId: 3,
          imgUrl:
            "https://res.cloudinary.com/dvduszbet/image/upload/v1679208939/spacebnb/docs/mars1_ew99u1.jpg",
          isPreview: false,
        },
        {
          spotId: 3,
          imgUrl:
            "https://res.cloudinary.com/dvduszbet/image/upload/v1679208941/spacebnb/docs/mars4_zdlrvz.png",
          isPreview: false,
        },
        {
          spotId: 4,
          imgUrl:
            "https://res.cloudinary.com/dvduszbet/image/upload/v1679208940/spacebnb/docs/theed4_pkxug1.png",
          isPreview: true,
        },
        {
          spotId: 4,
          imgUrl:
            "https://res.cloudinary.com/dvduszbet/image/upload/v1679208944/spacebnb/docs/theed3_u5y9uh.png",
          isPreview: false,
        },
        {
          spotId: 4,
          imgUrl:
            "https://res.cloudinary.com/dvduszbet/image/upload/v1679208939/spacebnb/docs/theed1_rccbgk.jpg",
          isPreview: false,
        },
        {
          spotId: 4,
          imgUrl:
            "https://res.cloudinary.com/dvduszbet/image/upload/v1679208936/spacebnb/docs/theed5_oz5whp.jpg",
          isPreview: false,
        },
        {
          spotId: 4,
          imgUrl:
            "https://res.cloudinary.com/dvduszbet/image/upload/v1679208937/spacebnb/docs/theed2_rbhmxg.jpg",
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
          [Op.in]: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
        },
      },
      {}
    );
  },
};
