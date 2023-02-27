const express = require("express");

const { requireAuth, restoreUser } = require("../../utils/auth");
const {
  User,
  Spot,
  Review,
  ReviewImage,
  SpotImage,
  Booking,
  Sequelize,
} = require("../../db/models");
const { check } = require("express-validator");
const { handleSpotValidation } = require("../../utils/validation");
const { paginator, spotsListMaker } = require("../../utils/helper");
const router = express.Router();
const { sequelize, Op } = require("sequelize");

router.delete("/:imageId", requireAuth, async (req, restoreUser) => {
  const imgId = req.params.imageId;
  const userId = req.user;

  const image = await ReviewImage.findByPk(imgId);

  if (!image) {
    res.status(404);
    return res.json({
      message: "Review Image couldn't be found",
      statusCode: 404,
    });
  }

  // check if review owner is current user
  const review = await Review.findByPk(image.reviewId);
  if (review.userId !== userId) {
    res.status(403);
    return res.json({
      message: "Forbidden",
      statusCode: 403,
    });
  }

  await image.destroy();

  res.status(200);
  res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

module.exports = router;
