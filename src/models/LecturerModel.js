const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LecturerSchema = new Schema({
    email: {
        type: String,
        trim: true,
        unique: "Email already exists",
    },
    password: {
        type: String,
        trim: true,
        required: "password is required"
    }, 
    isHandRaised: {
        type: Boolean
    }, 
    name: { 
        firstName:{
            type: String,
            required: "first name is required"
        },
        lastName:{
            type: String,
            required: "last name is required"
        },
        givenName:{
            type: String,
        },
    },
    id: {
        type: String,
        trim: true,
        unique: "Id already exists",
        required: "Id is required",
    }
})

const Lecturer = mongoose.model("Lecturer", LecturerSchema);
module.exports = Lecturer;