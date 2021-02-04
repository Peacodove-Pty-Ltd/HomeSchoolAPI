const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClassSchema = new Schema({
    name: {
        type: Date,
        unique: "class already exists",
        required: "Time is required",
    },
    code: {
        type: String,
        trim: true,
        unique: "class already exists",
        required: "class Id is required",
    }
})

const Class = mongoose.model("Class", ClassSchema);
module.exports = Class;