const express = require('express');
require('express-async-errors');
const morgan = require('morgan'); // HTTP req logger
const cors = require('cors'); // security
const csurf = require('csurf'); // security, deprecated
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

// require routers
const routes = require('./routes');

const { environment } = require('./config');
const isProduction = environment === 'production';

const app = express();
app.use(morgan("dev"));
app.use(cookieParser());
app.use(helmet());
app.use(express.json());


/* ---------------------------  CORS --------------------------- */
// security middleware
if (!isProduction) {
// engable cors only in development
    app.use(cors());
};

/* ------------------------ Helmet -------------------------- */
// helps set a variety of headers to better secure your app
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin",
  })
);

/* ---------------------------  CRSF  --------------------------- */
// The csurf middleware will add a _csrf cookie that is HTTP-only (can't be read by JavaScript) to any server response. It also adds a method on all requests (req.csrfToken) that will be set to another cookie (XSRF-TOKEN) later on

app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true,
    },
  })
);

/* ------------------------ Frontend Files -------------------------- */


/* ------------------------- API Endpoints -------------------------- */
app.use(routes);

/* ------------------------- Error handling -------------------------- */

// Resource Not Found Error-Handler
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = { message: "The requested resource couldn't be found." };
  err.status = 404;
  next(err);
});

// Sequelize Error-Handler
const { ValidationError } = require("sequelize");

// ...

// Process sequelize errors
app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    let errors = {};
    for (let error of err.errors) {
      errors[error.path] = error.message;
    }
    err.title = "Validation error";
    err.errors = errors;
  }
  next(err);
});

// Error Formatter Error-Handler
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || "Server Error",
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});


module.exports = app;
