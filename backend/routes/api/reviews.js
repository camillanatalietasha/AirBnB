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

  let userReviews = await Review.findAll({
    where: {
      userId: userId,
    }
  });

  let allUserReviews = [];
  for(let rev of userReviews) {
    let review = rev.toJSON();
    let user = await User.findByPk(userId, {
      attributes: ['id', 'firstName', 'lastName']
    });

    let spot = await Spot.findByPk(rev.spotId, {
      attributes: {
        exclude: ['description', 'createdAd', 'updatedAt']
      }
    });

    spot = spot.toJSON();

    let preview = await SpotImage.findOne({
      where: {
        spotId: spot.id,
        isPreview: true,
      },
      attributes: ['imgUrl']
    });
    if(!preview) {
      spot.previewImage = "No preview image available"
    } else {
      spot.previewImage = preview.imgUrl;
    }


    let revImages = await ReviewImage.findAll({
      where: {
        reviewId: review.id
      },
      attributes: ['id', 'imgUrl']
    });

    review.User = user;
    review.Spot = spot;
    
    if(!revImages.length) {
      review.ReviewImages = "No review images available"
    } else {
      review.ReviewImages = revImages;
    }


    allUserReviews.push(review);
    }

  res.status(200).json(allUserReviews) 
});

// get all reviews by spot id - i put this in spots router
// add review based on spot id - i put this in spots router

// add an image to review based on reviewid
router.post('/:reviewId/images', [requireAuth, restoreUser], async (req, res) => {
  const id = req.params.reviewId;
  const userId = req.user.id;

  let review = await Review.findByPk(id, {
    attributes: [
      
        [
          Sequelize.fn("COUNT", Sequelize.col("ReviewImages.id")),
          "ReviewImagesCount",
        ],
    
    ],
    include: [
      {
        model: ReviewImage,
        attributes: [],
      },
    ],
  });

  // error if no review with that Id
  if (!review) {
    res.status(404);
    res.json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  }

  if (review.userId !== userId) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  }
  // error if review already has 10 images
  if (review.ReviewImagesCount === 10) {
    res.status(403);
    res.json("Maximum number of images for this resource was reached");
  }

  // pull image url from body and create new image
  const { url } = req.body;
  const newReviewImage = await ReviewImage.create({
    reviewId: id,
    imgUrl: url,
  });

  res.status(200).json({
    id: newReviewImage.id,
    url: url,
  });
});

const validateReviewEdit = [
  check("review")
    .exists({ checkFalsy: true })
    .withMessage("Review text is required"),
  check("stars")
    .isInt({ min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 to 5"),
  handleSpotValidation,
];


// edit an exisitng review
router.put('/:reviewId', [validateReviewEdit, requireAuth, restoreUser], async(req, res) =>{
  const editReview = await Review.findByPk(req.params.reviewId);
  const userId = req.user.id;

  // error if review doesn't exist
  if (!editReview) {
    res.status(404);
    res.json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  }

  if (editReview.userId !== userId) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  }

  // extract review edits and pass in to edit
  const newReview = await Review.update(
    {
      review: req.body.review,
      stars: req.body.stars,
    },
    { returning: true, where: { id: req.params.reviewId } }
  );

  res.status(200).json(editReview);
})
  //


// delete a reivew
router.delete('/:reviewId', [requireAuth, restoreUser], async (req, res) => {
  let review = await Review.findByPk(req.params.id);
  const userId = req.user.id;

  if (!review) {
    return res.status(404).json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  }

  if (review.userId !== userId) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  }

  await review.destroy();
  res.staus(200).json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});


module.exports = router;