const mongoose = require( "mongoose" );

const { Schema } = mongoose;

// user database schema
const userSchema = new Schema( {
  name:{ 
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true, 
  },
  date: {
    type: Date,
    default: Date.now
  }
} );

const User = mongoose.model( "users", userSchema );
module.exports = User;
