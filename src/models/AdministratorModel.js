const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdministratorSchema = new Schema({
    email: {
        type: String,
        trim: true,
        unique: "Email already exists",
        // Regexp to validate emails with more strict rules as added in tests/users.js which also conforms mostly with RFC2822 guide lines
        match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 16,
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

AdministratorSchema.pre("save", function (next) {
    const admin = this
  
    if (this.isModified("password") || this.isNew) {
      bcrypt.genSalt(10, function (saltError, salt) {
        if (saltError) {
          return next(saltError)
        } else {
          bcrypt.hash(admin.password, salt, function(hashError, hash) {
            if (hashError) {
              return next(hashError)
            }
  
            admin.password = hash
            next()
          })
        }
      })
    } else {
      return next()
    }
  })
  
  AdministratorSchema.methods.comparePassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(error, isMatch) {
      if (error) {
        return callback(error)
      } else {
        callback(null, isMatch)
      }
    })
  }
  
module.exports = mongoose.model("Administrator", AdministratorSchema);