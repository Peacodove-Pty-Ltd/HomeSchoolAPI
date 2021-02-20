const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DiscussionSchema = new Schema({
    title: {
        type: String
    },
    details: {
        type: String,
        trim: true
    },
    date_created: {
        type: Date,
    },
    tags: [{
        type: String,
        trim: true
    }],
    comments: [{
        details: {
            type: String,
            trim: true
        },
        date_created: {
            type: Date,
        }, 
        reply: [{
            details: {
                type: String,
                trim: true
            },
            date_created: {
                type: Date,
            }
        }]
    }],
    student: [{
        type: String
    }],
    teacher: [{
        type: String
    }],
    course: [{
        type: String
    }],
    course_module: [{
        type: String
    }]
})

const Discussion = mongoose.model("Discussion", DiscussionSchema);
module.exports = Discussion;