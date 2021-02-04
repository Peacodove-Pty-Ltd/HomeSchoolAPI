const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AttandanceSchema = new Schema({
    lecturerId: {
        type: String,
        required: "Lecturer Id is required",
    },
    students: [{
        type: String,
        trim: true,
        unique: "student Id already exists",
        required: "student Id is required",
    }],
    time: {
        type: Date,
        required: "Time is required",
    },
})

const Attandance = mongoose.model("Attandance", AttandanceSchema);
module.exports = Attandance;