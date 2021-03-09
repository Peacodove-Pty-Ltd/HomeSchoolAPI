const mongoose = require( "mongoose" );

const { Schema } = mongoose;

const userSchema = new Schema( {
  email: {
    type: String,
    trim: true,
    unique: "Email already exists",
    match: [/.+@.+\..+/, "Please fill a valid email address"],
    required: "Email is required",
  },
} );

const User = mongoose.model( "User", userSchema );
module.exports = User;
