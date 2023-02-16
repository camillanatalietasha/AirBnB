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

module.exports = app;
