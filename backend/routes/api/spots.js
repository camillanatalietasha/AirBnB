const express = require("express");

const { setTokenCookie, requireAuth, restoreUser } = require("../../utils/auth");
const { User, Spot, Review, SpotImage } = require("../../db/models");
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


module.exports = router;
