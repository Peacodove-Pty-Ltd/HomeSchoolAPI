const express = require('express');
const router = express.Router();
let User = require("../models/user.model");

/**
  * getById
  *   @description CRUD ACTION get
  *   @param ObjectId id Id resource
  *
  */
router.route("/:id").get((req, res) => {
    const id = req.params.id;
    User.findOne({ _id : id })
        .then(user => res.json(user))
        .catch(err => res.status(400).json("Error getting element with id: "+id+" " + err));
});

/**
  * delete
  *   @description CRUD ACTION delete
  *   @param ObjectId id Id
  *
  */
router.route("/delete/:id").get((req, res) => {
    const id = req.params.id;
    User.findByIdAndRemove(id)
        .then(() => res.json("element with id: "+req.body.id+ " was deleted"))
        .catch(err => res.status(400).json("Error deleting element with id: "+req.body.id+ " "+ err));
});

/**
  * create
  *   @description CRUD ACTION create
  *
  */
router.route('/add').post((req, res) => {
    const item = req.body;
    const newUser = new User({item});
    newUser.save()
        .then(()=>res.json("you were added to the waiting list"))
        .catch(err => res.status(400).json("Error adding element to the waiting list: " + err))
});

/**
  * list
  *   @description CRUD ACTION list
  *
  */
router.route("").get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json("Error getting elements: " + err));
});

/**
  * update
  *   @description CRUD ACTION update
  *   @param ObjectId id Id
  *
  */
 router.route("/:id").get((req, res) => {
     const item = req.body;
    User.findOneAndUpdate({ _id: item._id }, item, {'new': true})
        .then(user => res.json(user))
        .catch(err => res.status(400).json("Error getting element: " + err));
});

module.exports = router;