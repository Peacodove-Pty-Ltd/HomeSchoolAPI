const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.route("/").get(userController.findUser);

router.route("/add").post(userController.addUser);

module.exports = router;
