const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdministratorSchema = new Schema({
    email: {
        type: String,
        trim: true,
        unique: "Email already exists",
    },
    password: {
        type: String,
        trim: true,
        required: "password is required"
    },
    
    phoneNumber: {
        type: "string",
        match: [/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/, "Please enter a valid phone-number"]
    },
    name: { 
        firstName:{
            type: String,
            required: "first name is required"
        },
        lastName:{
            type: String,
            required: "last name is required"
        },
        givenName:{
            type: String,
        },
    },
    id: {
        type: String,
        trim: true,
        unique: "Id already exists",
        required: "Id is required",
    }
})

module.exports = mongoose.model("Administrator", AdministratorSchema);