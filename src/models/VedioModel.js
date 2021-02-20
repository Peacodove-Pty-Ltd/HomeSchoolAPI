const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VedioSchema = new Schema({
    description: {
        type: String,
        trim: true
    }, 
    title: {
        type: String,
        trim: true
    },
    duration: {
        type: String
    },
    course_module: {
        type: String
    }
})

const Vedio = mongoose.model("Vedio", VedioSchema);
module.exports = Vedio;