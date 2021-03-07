const AdminModel = require('../models/AdministratorModel');

module.exports = {
  createAdmin: async userData => {
    let newUserDoc;
    try {
      newUserDoc = await AdminModel.create(userData);
    } catch (err) {
      console.log('An error ocurred while registering a user --');
      console.log(err.message);
      return null;
    }
    return newUserDoc;
  },
  getAllAdmin: async () => {
    let usersDoc;
    try {
      usersDoc = await AdminModel.find();
    } catch (err) {
      console.log('An error ocurred while retrieving all users --');
      console.log(err.message);
      return null;
    }
    return usersDoc;
  },
  findAdminById: async userId => {
    let userDoc;
    try {
      userDoc = await AdminModel.findById(userId);
    } catch (err) {
      console.log('An error ocurred while searching for user by Id --');
      console.log(err.message);
      return null;
    }
    return userDoc;
  },
  findAdminByEmail: async username => {
    let userDoc;
    try {
      userDoc = await AdminModel.findOne({ username });
    } catch (err) {
      console.log('An error ocurred while searching for user by username --');
      console.log(err.message);
      return null;
    }

    return userDoc;
  },
  updateAdmin: async (userId, newUserData) => {
    let updatedUserDoc;
    try {
      updatedUserDoc = await AdminModel.findByIdAndUpdate(userId, newUserData, {
        new: true,
      });
    } catch (err) {
      console.log('An error ocurred while updating user data --');
      console.log(err.message);
      return null;
    }
    return updatedUserDoc;
  },
  deleteAdmin: async userId => {
    let statusDelete;
    try {
      statusDelete = await AdminModel.findByIdAndRemove(userId);
    } catch (err) {
      console.log('An error ocurred while deleting user --');
      console.log(err.message);
      return null;
    }
    console.log(statusDelete);
    return statusDelete;
  },
};