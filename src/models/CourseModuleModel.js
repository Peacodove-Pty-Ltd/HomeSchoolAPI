const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseModuleSchema = new Schema({
    module_files: {
        type: File
    },
    is_completed: {
        type: String,
        trim: true
    },
    course: {
        type: String,
        trim: true
    }
})

const CourseModule = mongoose.model("CourseModule", CourseModuleSchema);
module.exports = CourseModule;