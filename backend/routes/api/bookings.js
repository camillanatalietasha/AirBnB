const express = require("express");

const { requireAuth, restoreUser } = require("../../utils/auth");
const { User, Spot, Review, SpotImage, ReviewImage, Booking, Sequelize } = require("../../db/models");
const { check } = require("express-validator");
const { handleSpotValidation } = require("../../utils/validation");
const { paginator, spotsListMaker } = require("../../utils/helper");
const router = express.Router();
const { sequelize, Op } = require("sequelize");

/*================================== routes ===============================*/


// REFACTOR - getting correct booking information back, but not getting 'Spots' to appear in the requested order 
router.get('/current', [requireAuth, restoreUser], async (req, res) => {
  const userId = req.user.id;
  
  const userBookings = await Booking.findAll({
    where: {
      userId: userId,
    },
    include: [
      {
        model: Spot,
      }
    ]
  });

  // const userBookingsDetails = userBookings.toJSON()  --> throwing an error not sure why?

  res.status(200).json({Bookings: userBookings});

})

module.exports = router;