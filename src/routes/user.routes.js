const express = require('express');
const router = express.Router();

//import user controllers
import {signupUser, loginUser} from "../controllers/user.controller"

// @route POST api/users/signup
// @desc signup new user
// @access PUBLIC
router.post("/signup", signupUser )

// @route POST api/users/login
// @desc login new user
// @access PUBLIC
router.post("/login", loginUser )

module.exports = router;
