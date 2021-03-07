const LecturerModel = require('../models/LecturerModel');

module.exports = {
  createLecturer: async userData => {
    let newUserDoc;
    try {
      newUserDoc = await LecturerModel.create(userData);
    } catch (err) {
      console.log('An error ocurred while registering a user --');
      console.log(err.message);
      return null;
    }
    return newUserDoc;
  },
  getAllLecturers: async () => {
    let usersDoc;
    try {
      usersDoc = await LecturerModel.find();
    } catch (err) {
      console.log('An error ocurred while retrieving all users --');
      console.log(err.message);
      return null;
    }
    return usersDoc;
  },
  findLecturerById: async userId => {
    let userDoc;
    try {
      userDoc = await LecturerModel.findById(userId);
    } catch (err) {
      console.log('An error ocurred while searching for user by Id --');
      console.log(err.message);
      return null;
    }
    return userDoc;
  },
  findLecturerByname: async username => {
    let userDoc;
    try {
      userDoc = await LecturerModel.findOne({ username });
    } catch (err) {
      console.log('An error ocurred while searching for user by username --');
      console.log(err.message);
      return null;
    }

    return userDoc;
  },
  findLecturerByEmail: async email => {
    let userDoc;
    try {
      userDoc = await LecturerModel.findOne({ admin });
    } catch (err) {
      console.log('An error ocurred while searching for user by username --');
      console.log(err.message);
      return null;
    }

    return userDoc;
  },
  updateLecturer: async (userId, newUserData) => {
    let updatedUserDoc;
    try {
      updatedUserDoc = await LecturerModel.findByIdAndUpdate(userId, newUserData, {
        new: true,
      });
    } catch (err) {
      console.log('An error ocurred while updating user data --');
      console.log(err.message);
      return null;
    }
    return updatedUserDoc;
  },
  deleteLecturer: async userId => {
    let statusDelete;
    try {
      statusDelete = await LecturerModel.findByIdAndRemove(userId);
    } catch (err) {
      console.log('An error ocurred while deleting user --');
      console.log(err.message);
      return null;
    }
    console.log(statusDelete);
    return statusDelete;
  },
};