const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    name: {
        type: Date,
        unique: "Course already exists",
        required: "Time is required",
    },
    code: {
        type: String,
        trim: true,
        unique: "Course already exists",
        required: "Course Id is required",
    }, 
    is_complete: {
        type: Boolean,
    }, 
    student: [{
        type: String
    }],
    teacher: [{
        type: String
    }],
    administrator: [{
        type: String
    }]
})

const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;