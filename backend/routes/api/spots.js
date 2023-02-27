const express = require("express");

const { requireAuth, restoreUser } = require("../../utils/auth");
const { User, Spot, Review, ReviewImage, SpotImage, Booking, Sequelize } = require("../../db/models");
const { check } = require("express-validator");
const { handleSpotValidation } = require("../../utils/validation");
const { paginator, spotsListMaker } = require("../../utils/helper");
const router = express.Router();
const { sequelize, Op } = require("sequelize");
// const { all } = require("./reviews");



/*================================= routes ================================*/
// GET all spots
router.get("/", async (req, res, next) => {
  // search filters
  let { page, size, maxLat, minLat, maxLng, minLng, maxPrice, minPrice } =
    req.query;
  let where = {};
  let errors = {};

  if (page < 1) errors.page = "Page must be greater than or equal to 1";
  if (size < 1) errors.size = "Size must be greater than or equal to 1";

  if ((maxLat && maxLat > 90) || maxLat < -90)
    errors.maxLat = "Maximum latitude is invalid";
  else if (maxLat) where.lat = { [Op.lte]: maxLat };

  if ((minLat && minLat > 90) || minLat < -90)
    errors.minLat = "Minimum latitude is invalid";
  else if (minLat) where.lat = { [Op.gte]: minLat };

  if ((maxLng && maxLng > 180) || maxLng < -180)
    errors.maxLng = "Maximum longitude is invalid";
  else if (maxLng) where.lng = { [Op.lte]: maxLng };

  if ((minLng && minLng > 180) || minLng < -180)
    errors.minLng = "Minimum latitude is invalid";
  else if (minLng) where.lng = { [Op.gte]: minLng };

  if (maxPrice && maxPrice < 0)
    errors.maxPrice = "Maximum price must be greater than or equal to 0";
  else if (maxPrice) where.price = { [Op.lte]: maxPrice };

  if (minPrice && minPrice < 0)
    errors.minPrice = "Minimum price must be greater than or equal to 0";
  else if (minPrice) where.price = { [Op.gte]: minPrice };

  if (Object.keys(errors).length) {
      res.status(400)
      return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors,
    });
  }

  // include all table table in query
  // manipulate object to show aggregate spot rating and preview photo
  const pagination = paginator(req, res);

  const spots = await Spot.findAll({
    where,
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
router.get('/current', [requireAuth, restoreUser], async (req, res) => {
    // authorization is passed
    // extract user 
    const userId = req.user.id;

    // const pagination = paginator(req, res);

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
    // ...pagination,
  });

  const Spots = spotsListMaker(spots);

  res.status(200).json({ Spots });
});

// REFACTOR not in corrent order
// get all bookings based on spotid
router.get("/:spotId/bookings", [requireAuth, restoreUser], async (req, res) => {
  const user = await User.findByPk(req.user.id);
  const spot = await Spot.findByPk(req.params.spotId);

  // error if the spot does not exist
  if(!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  };

// view all details if current user is owner of spot
 if (spot.hostId === user.id) {

  const spotBookings = await Booking.findAll({
    where: {
      spotId: spot.id,
    },
    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      }
    ]
  });

  let allBookingDetails = [];
  // iterate to turn to JSON
  spotBookings.forEach(info => {
    allBookingDetails.push(info.toJSON());
  });


   return res.status(200).json({Bookings: allBookingDetails});
 };

// get basic details if user is the booker
  const viewBooking = await Booking.findAll({
    where: {
      spotId : spot.id
    },
    attributes: ['spotId', 'startDate', 'endDate'],
  })

  res.status(200).json({Bookings: viewBooking});
});

// get all reviews by spotid
router.get("/:spotId/reviews", async (req, res) => {
  const spotId = req.params.spotId;
  const spot = await Spot.findByPk(spotId);

  if(!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404
    })
  };
  

  const spotReviews = await Review.findAll({
    where: {
      spotId: spotId,
    },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: ReviewImage,
        attributes: ["id", "imgUrl"],
      },
    ],
  });

  res.status(200).json(spotReviews);
});


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


// custom validator for review schema check
const isValidNum = val => {
  let num = +val
}

// check review schema
const validateReview = [
  check("review")
    .exists({ checkFalsy: true })
    .withMessage("Review text is required"),
  check("stars")
    .isInt({ min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 to 5"),
  handleSpotValidation,
];
// post a new review for a spot based on spotId
router.post("/:spotId/reviews", [ validateReview, requireAuth, restoreUser], async(req, res) => {
  // check if spot exists
  const spotId = req.params.spotId;
  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    res.status(404);
    res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  };

  // check if current user already has a review for this spot
  const userId = req.user.id;
  const userReviews = Review.findAll({
    where: {
      [Op.and]: 
        [{ userId: userId }, { spotId: spotId }],
    },
  });

  if (userReviews.length) {
    res.status(403);
    res.json({
      message: "User already has a review for this spot",
      statusCode: 403
    })
  };

  // create new review
  const { review, stars } = req.body;
  const newReview = await Review.create({
    spotId,
    userId,
    review,
    stars,
  });

  res.json(newReview);
})



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


// const validateBooking = [
//   check("startDate")
//     .toDate()
//     .custom((end, { req }) => {
//       if(end.getTime() < req.body.startDate.getTime()) {
//         return false;
//       }
//       return true;
//     }),
//   check("endDate")
//     .toDate()
//     .custom((end, { req }) => {
//       if(end.getTime() < req.body.startDate.getTime()) {
//         return false;
//       }
//       return true;
//     })
//     .withMessage("endDate cannot be on or before startDate")
// ]

// REFACTOR - messy, reduntant and ugly but holy moly it seems to be working 
// POST new booking based on spotId
router.post('/:spotId/bookings', [requireAuth, restoreUser], async(req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);
  const currentUser = req.user;

  if(!spot) {
    res.status(404);
    res.json({
      message: "Spot couldn't be found",
      statusCode: 404
    });
  };

  if(spot.hostId === currentUser.id) {
    res.status(400);
    res.json({
      message: "You can't book your own spot",
      statusCode: 400
    }); 
  };

  const { startDate, endDate } = req.body;

  if(new Date(endDate) <= new Date(startDate)){
    res.status(400)
    return res.json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        endDate: "endDate cannot be on or before startDate"
      }
    });
  } 

  // get all current bookings for spot and check for conflicts
  let errors = {};
  let foundConflict = false;
  
  // get all days between start and end
  const dateRange = ((start, end) => {
    let dates = [];
    const theDate = new Date(start);
    while(theDate < new Date(end)) {
      dates = [...dates, new Date(theDate)];
      theDate.setDate(theDate.getDate() + 1)
    }
    dates = [...dates, new Date(end)];
    return dates;
  })

  const currentBookings = await Booking.findAll({
    where: {
      spotId: spot.id,
    },
    attributes: ['startDate', 'endDate']
  })

  // test given start and end dates again current bookings
  currentBookings.forEach(booking => {
    let bookedStart = booking.startDate;
    let bookedEnd = booking.endDate;
    let range = dateRange(bookedStart, bookedEnd);
    // let tryStart = new Date(startDate);
    // let tryEnd = new Date(endDate)
    let checkRange = [];

    range.forEach(d => {
      d = d.toISOString().slice(0,10);
      checkRange.push(d);
    })

    if(checkRange.includes(startDate)) {
      errors.startDate = "Start date conflicts with an existing booking";
      foundConflict = true;
    };
    if(checkRange.includes(endDate)) {
      errors.endDate = "End date conflicts with an existing booking";
      foundConflict = true;
    }
  });

  if(foundConflict) {
    res.status(403);
    return res.json({
      message: "Sorry, this spot is already booked for the specified dates",
      statusCode: 403,
      errors
    })
  }


  const newBooking = await Booking.create({
    spotId: spot.id,
    userId: currentUser.id,
    startDate,
    endDate
  });

  res.json(newBooking);

})


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
  const userId = req.user;

  // throw error if spot does not exist
  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  if (spot.ownerId !== userId) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  }

  // create new instance of SpotImage
  const newSpotImage = await SpotImage.create({
    spotId: spot.id,
    imgUrl: url,
    isPreview: preview,
  });

  res.status(200);
  res.json({
    id: newSpotImage.id,
    url: newSpotImage.imgUrl,
    preview: newSpotImage.isPreview,
  });
});

// PUT a spot
router.put('/:spotId',[requireAuth, validateNewSpot], async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  const spotId = req.params.id;
  const userId = req.user;
  const spot = await Spot.findByPk(req.params.spotId);

  // throw error if spot does not exist
  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  if (spot.ownerId !== userId) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  }

  const udpatedSpot = await Spot.update(
    {
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
  const spot = await Spot.findByPk(req.params.id);
  const userId = req.user;

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  if (spot.ownerId !== userId) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  }

  await spot.destroy();
  res.staus(200).json({
    message: "Successfully deleted",
    statusCode: 200,
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
