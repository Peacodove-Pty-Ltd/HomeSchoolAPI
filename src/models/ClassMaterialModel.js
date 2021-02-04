const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClassMaterialSchema = new Schema({
    time: {
        type: Date,
        required: "Time is required",
    },
    lessonId: {
        type: String,
        trim: true,
        unique: "lesson already exists",
        required: "lesson Id name is required",
    },
    notes: {
        type: File,
        trim: true,
        unique: "desctiption for event is unique",
    },
    exam: {
        examId: {
            type: String,
            trim: true,
            unique: "Id for exam must be unique",
            required: "exam Id is required"
        },
        content: {
            type: File,
            trim: true,
            unique: "desctiption for event is unique",
        }
    },
    homework: {
        homeworkId: {
            type: String,
            trim: true,
            unique: "Id for homework must be unique",
            required: "homework Id is required"
        },
        content: {
            type: File,
            trim: true,
            unique: "desctiption for homework is unique",
        }
    },
    ppSlides: {
        type: File,
        trim: true,
        unique: "desctiption for event is unique",
    }
})

const ClassMaterial = mongoose.model("ClassMaterial", ClassMaterialSchema);
module.exports = ClassMaterial;