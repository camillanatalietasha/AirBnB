const express = require("express");

const { setTokenCookie, requireAuth, restoreUser } = require("../../utils/auth");
const { User, Spot, Review, SpotImage, Sequelize } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { paginator, spotsListMaker } = require("../../utils/helper");
const router = express.Router();
const { sequelize, Op } = require("sequelize");

/*=================================================================*/


// GET all spots
router.get("/", async (req, res, next) => {

  // include all table table in query
  // manipulate object to show aggregate spot rating and preview photo
  const pagination = paginator(req, res);

  const spots = await Spot.findAll({
    include: [
      {
        model: Review,
      },
      {
        model: SpotImage,
      },
    ],
    ...pagination,
  });

  const Spots = spotsListMaker(spots);

  res.status(200).json({ Spots });
});

// GET all Spots owned by current user
router.get('/current', requireAuth, async (req, res) => {
    // authorization is passed
    // extract user 
    const userId = req.current.id;

    const pagination = paginator(req, res);

    const spots = await Spot.findAll({
    where: {
        hostId: userId,
    },
    include: [
      {
        model: Review,
      },
      {
        model: SpotImage,
      },
    ],
    ...pagination,
  });

  const Spots = spotsListMaker(spots);

  res.status(200).json({ Spots });
})

router.get("/:spotId", async (req, res) => {
  // extract spotId from params
  const spotId = parseInt(req.params.spotId);

  


  // retrieve spot details and convert to JSON object
  const getSpot = await Spot.findByPk(spotId);
  const allSpotDetails = getSpot.toJSON();

  // get and set key for num reviews  
  await Review.count({ where: { "spotId": spotId}})
    .then(c => { allSpotDetails.numReviews = c });
  await Review.sum('stars', { where: { "spotId": spotId }})
    .then(s => { allSpotDetails.avgStarRating = s / allSpotDetails.numReviews });
  await SpotImage.findAll({where: { spotId: spotId }})
    .then(i => {allSpotDetails.SpotImages = i});
  let owner = await Spot.findByPk(spotId, {
    raw: true, // flattens the include object so is inline 
    attributes: ['Owner.id', 'Owner.firstName', 'Owner.lastName'],
    include: [{
      model: User,
      as: "Owner",
      attributes: [],
    }],
  })

  allSpotDetails.Owner = owner;

  res.status(200).json(allSpotDetails);
});



// -------------------> saving for refactoring
// router.get("/:spotId", async (req, res) => {
//   // extract spotId from params
//   const spotId = req.params.spotId;
//   // retrieve spot details (with reviews and images)
//   const getSpot = await Spot.findByPk(spotId, {
//     include: [
//       {
//         model: Review,
//         attributes: ["stars"], // rename this attribute, count later
//       },
//       {
//         model: SpotImage,
//       },
//     ],
//   });
//   // convert to JSON object
//   const allSpotDetails = getSpot.toJSON();
//   // iterate to total numReviews and sum all ratings
// //   let ratingTotal = 0;
// //   let numReviews = 0
//   allSpotDetails.Reviews.forEach((rev) => {
//     allSpotDetails.numReviews += 1;
//     allSpotDetails.avgStarRating += rev.stars;
//   });
//   // calculate avg and remove reviews obj
//   allSpotDetails.avgStarRating = allSpotDetails.avgStarRating / allSpotDetails.numReviews;
//   delete allSpotDetails.Reviews;



//   res.status(200).json({allSpotDetails});
// });


module.exports = router;
