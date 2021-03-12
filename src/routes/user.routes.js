const express = require( 'express' );

const router = express.Router();

// import user controllers
const userRoutes =require( "../controllers/user.controller" ); 

// @route POST api/users/signup
// @desc signup new user
// @access PUBLIC
router.post( "/signup", userRoutes.signupUser );

// @route POST api/users/login
// @desc login new user
// @access PUBLIC
router.post( "/login", userRoutes.loginUser );

module.exports = router;
