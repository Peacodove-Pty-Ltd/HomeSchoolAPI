const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        trim: true,
        unique: "Email already exists",
        match: [/.+\@.+\..+/, "Please fill a valid email address"],
        required: "Email is required",
    },
    password: {
        type: String,
       /** match: [/{expression}/, "Password must have a number[0 to 9], an uppercase latter and a lowercase letter"], */
        required: "password is required",
    },
    id: {
        type: String,
        trim: true,
        unique: "Id already exists",
        required: "Id is required",
    }
})

const User = mongoose.model("User", userSchema);
module.exports = User;