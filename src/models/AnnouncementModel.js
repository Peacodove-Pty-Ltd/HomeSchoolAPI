const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnnouncementSchema = new Schema({
    time: {
        type: Date,
        required: "Time is required",
    },
    eventName: {
        type: String,
        trim: true,
        unique: "event already exists",
        required: "event name is required",
    },
    desctiprion: {
        type: String,
        trim: true,
        required: "desctiption for event is required",
    }
})

const Announcement = mongoose.model("Announcement", AnnouncementSchema);
module.exports = Announcement;