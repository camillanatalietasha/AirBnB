// express-validator dependency -> validate user input from req bodies

const { validationResult } = require("express-validator");
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

    const err = Error("Validation Error");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    next(err);
  }
  next();
};

let handleSpotValidation = (req, _res, next) => {
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


module.exports = {
  handleValidationErrors,
  handleSpotValidation,
  
};