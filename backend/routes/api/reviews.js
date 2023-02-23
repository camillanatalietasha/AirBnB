const express = require("express");

const { requireAuth, restoreUser } = require("../../utils/auth");
const { User, Spot, Review, SpotImage, ReviewImage, Sequelize } = require("../../db/models");
const { check } = require("express-validator");
const { handleSpotValidation } = require("../../utils/validation");
const { paginator, spotsListMaker } = require("../../utils/helper");
const router = express.Router();
const { sequelize, Op } = require("sequelize");

/*================================== routes ===============================*/

router.get('/current', [requireAuth, restoreUser ], async (req, res) => {
  const userId = req.user.id;

  const pagination = paginator(req, res);

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
})

module.exports = router;