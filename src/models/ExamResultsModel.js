const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExamResultsSchema = new Schema({
    time: {
        type: Date,
        required: "Time is required",
    },
    examId: {
        type: String,
        trim: true,
        unique: "exam already exists",
        required: "exam Id is required",
    },
    results: [{
        studentId: {
            type: String,
            trim: true,
            unique: "Id for exam must be unique",
            required: "exam Id name is required"
        },
        mark: {
            type: Number,
            trim: true,
            required: "mark for student is required",
        }
    }]
})

const ExamResults = mongoose.model("ExamResults", ExamResultsSchema);
module.exports = ExamResults;