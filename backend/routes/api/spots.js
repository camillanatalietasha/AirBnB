const express = require("express");

const { requireAuth, restoreUser } = require("../../utils/auth");
const { User, Spot, Review, SpotImage, Sequelize } = require("../../db/models");
const { check } = require("express-validator");
const { handleSpotValidation } = require("../../utils/validation");
const { paginator, spotsListMaker } = require("../../utils/helper");
const router = express.Router();
const { sequelize, Op } = require("sequelize");



/*================================= routes ================================*/
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
router.get('/current', [requireAuth, restoreUser ], async (req, res) => {
    // authorization is passed
    // extract user 
    const userId = req.user.id;

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
  // throw error if spot not found
  if(!getSpot) {
    res.status(404);
    return res.json({
        message: "Spot couldn't be found",
        statusCode: 404,
    })
  };
  
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


// REFACTOR - find way to check these directly (or equally) to model validations

const validateNewSpot = [
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Street address is required"),
  check("city")
    .exists({ checkFalsy: true })
    .withMessage("City is required"),
  check("state")
    .exists({ checkFalsy: true })
    .withMessage("State is required"),
  check("country")
    .exists({ checkFalsy: true })
    .withMessage("Country is required"),
  check("lat")
    .isDecimal()
    .withMessage("Latitude is not valid"),
  check("lng")
    .isDecimal()
    .withMessage("Longitude is not valid"),
  check("name")
    .exists({ checkFalsy: true })
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check("price")
    .isInt()
    .withMessage("Price per day is required"),
    handleSpotValidation
];

// REFACTOR make a helper func for finding spotID and throwing error if does not exist 

// POST a new spot
router.post('/', [requireAuth, restoreUser, validateNewSpot], async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body;
  const hostId = req.user.id;

  const newSpot = await Spot.create({
    hostId, address, city, state, country, lat, lng, name, description, price
  });

  res.status(201).json(newSpot);
})

// POST new image for spot based on spotId
router.post('/:spotId/images', requireAuth, async (req, res) => {
  const { url, preview } = req.body;
  const spot = await Spot.findByPk(req.params.spotId);

  // throw error if spot does not exist
  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404
    })
  };

  // create new instance of SpotImage
  const newSpotImage = await SpotImage.create({ 
      spotId: spot.id,
      imgUrl: url,
      isPreview: preview
  });

  res.status(200);
  res.json({
    id: newSpotImage.id,
    url: newSpotImage.imgUrl,
    preview: newSpotImage.isPreview 
  })
})

// PUT a spot
router.put('/:spotId',[requireAuth, validateNewSpot], async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body;
  const spotId = req.params.id;
  const spot = await Spot.findByPk(req.params.spotId);

  // throw error if spot does not exist
  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404
    })
  };
  
  const udpatedSpot = await Spot.update({
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  },
  {
    where: { id: spotId },
  }
  );

  res.status(200).json(udpatedSpot);

  
});

// delete a spot
router.delete('/:spotId', [requireAuth, restoreUser], async (req, res) => {
  let spot = await Spot.findByPk(req.params.id);

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  };

  await spot.destroy();
  res.staus(200).json({
    message: 'Successfully deleted',
    statusCode: 200
  });

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
