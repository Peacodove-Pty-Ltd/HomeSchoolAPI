const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CalenderSchema = new Schema({
    day: {
        type: Number
    }, 
    month: {
        type: Number
    },
    year: {
        type: Number
    },
    day_name: {
        type: String
    },
    month_name: {
        type: String
    },
    student: [{
        type: String
    }],
    teacher: [{
        type: String
    }],
    administrator: [{
        type: String
    }],
})

const Calender = mongoose.model("Calender", CalenderSchema);
module.exports = Calender;