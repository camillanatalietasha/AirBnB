// express-validator dependency -> validate user input from req bodies

const { validationResult, handleSpotValidation, checkReviewSchema } = require("express-validator");
// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
// // original
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = {};
    validationErrors
      .array()
      .forEach((error) => (errors[error.param] = error.msg));

    const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    next(err);
  }
  next();
};

const handleSpotValidation = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = {};
    validationErrors
      .array()
      .forEach((error) => (errors[error.param] = error.msg));

    const err = Error("Validation Error");
    err.errors = errors;
    err.status = 400;
    err.title = "Validation Error";
    next(err);
  }
  next();
};

const checkReviewSchema = {
  review: {
    isLength: {
      errorMessage: "Review text is required",
      options: { min: 5 },
    },
  },
  stars: {
    isInt: {
      errorMessage: "Stars must be an integer from 1 to 5",
      toInt: true,
      options: [{ gt: 1, lt: 5 }],
    },
  },
};



module.exports = {
  handleValidationErrors,
  handleSpotValidation,
  checkReviewSchema
};