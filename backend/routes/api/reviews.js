const express = require("express");

const { requireAuth, restoreUser } = require("../../utils/auth");
const { User, Spot, Review, SpotImage, ReviewImage, Sequelize } = require("../../db/models");
const { check } = require("express-validator");
const { handleSpotValidation } = require("../../utils/validation");
const { paginator, spotsListMaker } = require("../../utils/helper");
const router = express.Router();
const { sequelize, Op } = require("sequelize");

/*================================== routes ===============================*/

// get reviews of current user
router.get('/current', [requireAuth, restoreUser ], async (req, res) => {
  const userId = req.user.id;


  // const pagination = paginator(req, res); don't need

  const userReviews = await Review.findAll({
    where: {
      userId: userId,
    },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"]
      },
      {
        model: ReviewImage,
        attributes: ["id", "imgUrl"]
      }
    ]
  });
  res.json(userReviews)
});

// get all reviews by spot id - i put this in spots router
// add review based on spot id - i put this in spots router




// delete a reivew
router.delete('/:reviewId', [requireAuth, restoreUser], async (req, res) => {
  let review = await Review.findByPk(req.params.id);

  if (!review) {
    return res.status(404).json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  };

  await review.destroy();
  res.staus(200).json({
    message: 'Successfully deleted',
    statusCode: 200
  });

});


module.exports = router;