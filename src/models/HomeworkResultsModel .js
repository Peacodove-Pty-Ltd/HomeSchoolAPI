const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HomeworkResultsSchema = new Schema({
    homeworkId: {
        type: String,
        trim: true,
        unique: "Id already exists",
        required: "homework Id is required",
    },
    lessonId: {
        type: String,
        trim: true,
        unique: "Id already exists",
        required: "lesson Id is required",
    },
    results: [{
        studentId: {
            type: String,
            trim: true,
            unique: "Id for exam must be unique",
            required: "homework Id name is required"
        },
        mark: {
            type: Number,
            trim: true,
            required: "mark for student is required",
        }
    }]
})

const HomeworkResults = mongoose.model("HomeworkResults", HomeworkResultsSchema);
module.exports = HomeworkResults;