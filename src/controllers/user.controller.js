const User = require("../models/user.model");

const addUser = async (req, res) => {
  const email = req.body.email;
  const newUser = new User({ email });
  await newUser
    .save()
    .then(() => res.status(200).json("you were added to the waiting list"))
    .catch((err) => res.status(400).json("Error: " + err));
};

const findUser = async (req, res) => {
  await User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
};

module.exports = {
  addUser,
  findUser,
};
