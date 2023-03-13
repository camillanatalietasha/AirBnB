const express = require("express");

const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User } = require("../../db/models");
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// middleware to check is req.body.credential and req.body.passweord are empty
const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];

// login
router.post("/", validateLogin, async (req, res, next) => {
  const { credential, password } = req.body;

  const user = await User.login({ credential, password });

  if (!user) {
    const err = new Error("Login failed");
    err.status = 401;
    err.title = "Login failed";
    err.errors = { credential: "The provided credentials were invalid." };
    return next(err);
  }

  await setTokenCookie(res, user);
  return res.json({
    user: user,
  });
});

// restore session user
router.get('/', restoreUser, (req, res) => {
    const { user } = req;
    if (user) {
        // return res.json({
        //     user: user.toSafeObject()
        // }); // was not returning the username, first name or last name
        return res.json({
          user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            emai: user.email,
            username: user.username
          }
        })
    } else return res.json({ user: null });
});

// log out
router.delete( '/', (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' })
});




module.exports = router;
