const {
  User,
  Spot,
  Review,
  SpotImage,
  ReviewImage,
} = require("../db/models");

/*=============================Pagination helper function=============================*/

const { Sequelize } = require("../db/models");

const paginator = function (req, res) {
  let { page, size } = req.query;
  let pagination = {};

  // set default pagination if not specified in query
  size = !size || parseInt(size) <= 0 ? (size = 6) : (size = parseInt(size));
  page = !page || parseInt(page) <= 0 ? (page = 1) : (page = parseInt(page));

  if (page >= 1 && size >= 1) {
    pagination.limit = size;
    pagination.offset = size * (page - 1);
  }

  return pagination;
};

/*=============================Manipulate Spots Queries Objects=============================*/

// list of several spots
const spotsListMaker = function (spots) {
  let Spots = [];
  // iterate to turn results to JSON object
  spots.forEach((spot) => {
    Spots.push(spot.toJSON());
  });

  // nested loop to extract all star ratings then calculate average and add a key 'avgRating' to the current spot
  Spots.forEach((spot) => {
    let total = 0;
    let stars = 0;
    spot.Reviews.forEach((review) => {
      total += review.stars;
      stars += 1;
    });
    let avg = total / stars;
    spot.avgRating = Math.round(avg * 10) / 10;
    // delete the unneeded Reivews object from each spot
    delete spot.Reviews;
  });

  // nested loop to extract the previewImage for each spot
  Spots.forEach((spot) => {
    spot.SpotImages.forEach((img) => {
      if (img.isPreview === true) {
        spot.previewImage = img.imgUrl;
      }
    });
    // delete the unneeded Reivews object from each spot
    delete spot.SpotImages;
  });
  return Spots;
};

// spot details object
const spotWithPreview = async function (spotId) {
  const allSpots = await Spot.findByPk(spotId, {
    include: [
      {
        model: SpotImages,
      },
    ],
  });

  let spot = [];
  // iterate to turn results to JSON object
  allSpots.forEach((spt) => {
    spot.push(spt.toJSON());
  });

  spot.forEach((s) => {
    s.SpotImages.forEach((i) => {
      if (i.isPreview === true) {
        s.previewImage = i.imgUrl;
      }
    });
    delete s.SpotImages;
  });
};

module.exports = { paginator, spotsListMaker, spotWithPreview };
