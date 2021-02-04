const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LessonSchema = new Schema({
    time: {
        type: Date,
        required: "Time is required",
    },
    lessonId: {
        type: String,
        trim: true,
        unique: "lesson already exists",
        required: "lesson Id is required",
    }
})

const Lesson = mongoose.model("Lesson", LessonSchema);
module.exports = Lesson;