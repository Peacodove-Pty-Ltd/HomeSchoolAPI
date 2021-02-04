const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TimetableSchema = new Schema({
    time: {
        type: Date,
        required: "Time is required",
    },
    eventName: {
        type: String,
        trim: true,
        unique: "event already exists",
        required: "event name is required",
    }
})

const Timetable = mongoose.model("Timetable", TimetableSchema);
module.exports = Timetable;