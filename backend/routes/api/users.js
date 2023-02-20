const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const router = express.Router();

// use the signup static method from User model
router.post(
    '/',
    async (req, res) => {
        const { email, password, username } = req.body;
        const user = await User.signup({email, username, password});

        await setTokenCookie(res, user);

        return res.json({
            user: user
        });
    }
);



module.exports = router;
