const express = require("express");

const { requireAuth, restoreUser } = require("../../utils/auth");
const { User, Spot, Review, SpotImage, ReviewImage, Booking, Sequelize } = require("../../db/models");
const { check } = require("express-validator");
const { handleSpotValidation } = require("../../utils/validation");
const { paginator, spotsListMaker, spotWithPreview } = require("../../utils/helper");
const router = express.Router();
const { sequelize, Op } = require("sequelize");

/*================================== routes ===============================*/


// REFACTOR - getting correct booking information back, but not getting 'Spots' to appear in the requested order 
router.get("/current", requireAuth, async (req, res) => {
  const id = req.user.id;

  let Bookings = await Booking.findAll({
    where: {
      userId: id,
    },
  });

  // push formated bookings into allBookings
  let allBookings = [];

  for (let booking of Bookings) {
    let convertedBooking = booking.toJSON();
    let bookedSpot = await Spot.findOne({
      where: {
        id: booking.spotId,
      },
      attributes: {
        exclude: ["description", "createdAt", "updatedAt"],
      },
    });

    bookedSpot = bookedSpot.toJSON();

    let preview = await SpotImage.findOne({
      where: {
        spotId: bookedSpot.id,
        isPreview: true,
      },
      attributes: ["imgUrl"],
    });

    if (!preview) {
      bookedSpot.previewImage = "No preview image available";
    } else {
      bookedSpot.previewImage = preview.imgUrl;
    }

    convertedBooking.Spot = bookedSpot;
    allBookings.push(convertedBooking);
  }

  res.status(200).json({ Bookings: allBookings });
});

// edit a booking by bookingid
router.put('/:bookingId', requireAuth, async (req, res) => {
  const bookingId = req.params.bookingId;
  const id = req.user.id;
  const { startDate, endDate }  = req.body; 
  const booking = await Booking.findByPk(bookingId)

  if(!booking) {
    res.status(404);
    return res.json({
      message: "Booking couldn't be found",
      statusCode: 404,
    })
  }

  if (booking.userId !== id) {
      res.status(403);
      return res.json({
        message: "Forbidden",
        statusCode: 403
      })

  }

  if (new Date(endDate) <= new Date(startDate)) {
    res.status(400);
    return res.json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        endDate: "endDate cannot come before startDate",
      },
    });
  }

  // check if booking dates are in the past
  const today = new Date().getTime();
  if (new Date(booking.endDate) < today) {
    res.status(403);
    return res.json({
      message: "Past bookings can't be modified",
      statusCode: 403
    })
  }
  

  // get all current bookings for spot and check for conflicts
  let errors = {};
  let foundConflict = false;

  // get all days between start and end
  const dateRange = (start, end) => {
    let dates = [];
    const theDate = new Date(start);
    while (theDate < new Date(end)) {
      dates = [...dates, new Date(theDate)];
      theDate.setDate(theDate.getDate() + 1);
    }
    dates = [...dates, new Date(end)];
    return dates;
  };


  // test given start and end dates again current bookings
  const checkConflicts = ((b) => {
    let bookedStart = booking.startDate;
    let bookedEnd = booking.endDate;
    let range = dateRange(bookedStart, bookedEnd);
    // let tryStart = new Date(startDate);
    // let tryEnd = new Date(endDate)
    let checkRange = [];

    range.forEach((d) => {
      d = d.toISOString().slice(0, 10);
      checkRange.push(d);
    });

    if (checkRange.includes(startDate)) {
      errors.startDate = "Start date conflicts with an existing booking";
      foundConflict = true;
    }
    if (checkRange.includes(endDate)) {
      errors.endDate = "End date conflicts with an existing booking";
      foundConflict = true;
    }
  });

  if (foundConflict) {
    res.status(403);
    return res.json({
      message: "Sorry, this spot is already booked for the specified dates",
      statusCode: 403,
      errors,
    });
  }

  checkConflicts(booking);

  // if no errors, update the booking
  await booking.update({
    startDate: startDate,
    endDate: endDate,
  })

  res.status(200)
  res.json(booking)
})

// delete a booking
router.delete('/:bookingId', [requireAuth, restoreUser], async(req, res) => {
  const bookingId = req.params.bookingId;
  const userId = req.user.id;
  const booking = await Booking.findByPk(bookingId);

  if(!booking) {
    res.status(404);
    return res.json({
      message: "Booking couldn't be found",
      statusCode: 404
    });
  }

  // error if booking has already started
    const today = new Date().getTime();
    if (new Date(booking.startDate) < today) {
      res.status(403);
      return res.json({
        message: "Bookings that have started can't be deleted",
        statusCode: 403,
      });
    }

    // check if current user is either host or user that booked 
    const spot = await Spot.findByPk(booking.spotId);

    if(spot.hostId === userId || booking.userId === userId) {
      await booking.destroy();
      res.status(200);
      res.json({
        message: "Successfully deleted",
        statusCode: 200
      })
    } else {
      res.status(403);
      return res.json({
        message: "Forbidden",
        statusCode: 403
      })
    }
})

module.exports = router;