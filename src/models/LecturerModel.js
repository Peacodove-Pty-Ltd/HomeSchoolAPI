const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LecturerSchema = new Schema({
    email: {
        type: String,
        trim: true,
        unique: "Email already exists",
        match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please fill a valid email address"],
    },
    password: {
        type: String,
        trim: true,
        minlength: 8,
        maxlength: 16,
        required: "password is required"
    }, 
    isHandRaised: {
        type: Boolean
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


LecturerSchema.pre("save", function (next) {
    const lecturer = this
  
    if (this.isModified("password") || this.isNew) {
      bcrypt.genSalt(10, function (saltError, salt) {
        if (saltError) {
          return next(saltError)
        } else {
          bcrypt.hash(lecturer.password, salt, function(hashError, hash) {
            if (hashError) {
              return next(hashError)
            }
  
            lecturer.password = hash
            next()
          })
        }
      })
    } else {
      return next()
    }
  })
  
  LecturerSchema.methods.comparePassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(error, isMatch) {
      if (error) {
        return callback(error)
      } else {
        callback(null, isMatch)
      }
    })
  }

const Lecturer = mongoose.model("Lecturer", LecturerSchema);
module.exports = Lecturer;