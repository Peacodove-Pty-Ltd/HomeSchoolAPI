const StudentModel = require('../models/StudentModel');

module.exports = {
  createStudent: async userData => {
    let newUserDoc;
    try {
      newUserDoc = await StudentModel.create(userData);
    } catch (err) {
      console.log('An error ocurred while registering a user --');
      console.log(err.message);
      return null;
    }
    return newUserDoc;
  },
  getAllStudent: async () => {
    let usersDoc;
    try {
      usersDoc = await StudentModel.find();
    } catch (err) {
      console.log('An error ocurred while retrieving all users --');
      console.log(err.message);
      return null;
    }
    return usersDoc;
  },
  findStudentById: async userId => {
    let userDoc;
    try {
      userDoc = await StudentModel.findById(userId);
    } catch (err) {
      console.log('An error ocurred while searching for user by Id --');
      console.log(err.message);
      return null;
    }
    return userDoc;
  },
  findByStudentname: async username => {
    let userDoc;
    try {
      userDoc = await StudentModel.findOne({ username });
    } catch (err) {
      console.log('An error ocurred while searching for user by username --');
      console.log(err.message);
      return null;
    }

    return userDoc;
  },
  findByStudentEmail: async username => {
    let userDoc;
    try {
      userDoc = await StudentModel.findOne({ username });
    } catch (err) {
      console.log('An error ocurred while searching for user by username --');
      console.log(err.message);
      return null;
    }

    return userDoc;
  },
  updateStudent: async (userId, newUserData) => {
    let updatedUserDoc;
    try {
      updatedUserDoc = await StudentModel.findByIdAndUpdate(userId, newUserData, {
        new: true,
      });
    } catch (err) {
      console.log('An error ocurred while updating user data --');
      console.log(err.message);
      return null;
    }
    return updatedUserDoc;
  },
  deleteStudent: async userId => {
    let statusDelete;
    try {
      statusDelete = await StudentModel.findByIdAndRemove(userId);
    } catch (err) {
      console.log('An error ocurred while deleting user --');
      console.log(err.message);
      return null;
    }
    console.log(statusDelete);
    return statusDelete;
  },
};