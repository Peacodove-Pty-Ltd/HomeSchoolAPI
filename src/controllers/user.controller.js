/*eslint-disable consistent-return*/

const User = require("../models/user.model");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()

// import validation rules
const signUpValidation = require("../helpers/signUpValidation")
const loginValidation = require("../helpers/loginValidation");

const signupUser = (req, res) => {
  // Form validation
  const {errors, isValid} = signUpValidation(req.body);

  // check fields for validation
  if(!isValid){
    return res.status(400).json(errors);
  }

  // add user
  User.findOne({email: req.body.email}).then(user=>{
    if(user){
      return res.status(400).json({email: "Email already exists"}) 
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      })

      // hash password before saving to database
      bcrypt.genSalt(10,(err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => { // eslint-disable-line no-shadow
          if(err) throw err;
          newUser.password = hash;
           newUser
           .save()
           .then(user=>res.json(user)) // eslint-disable-line no-shadow
           .catch(err=>console.log(err)) // eslint-disable-line no-console
        })
      })
    }
  })
}

const loginUser = (req, res)=> {
  // Form Validation
  const {errors, isValid} = loginValidation(req.body);

  // check validation 
  if(!isValid){
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find User by email 
  User.findOne({email}).then(user => {
    // check if user exists
    if(!user){
      return res.status(404).json({emailnotfound: "Email not found"})
    }

    //check password
    bcrypt.compare(password, user.password).then(isMatch=> {
      if(isMatch){
        //if user matched then create JWT payload
        const payload = {
          id: user.id,
          name: user.name
        };
        //signin token
        jwt.sign(
          payload,
          process.env.secretOrKey,
          {
            expiresIn: 10000 // 1000 seconds
          },
          (error, token)=>{
            res.json({
              success: true,
              token: "Bearer " + token
            })
          }
        )
      } else {
        return res
        .status(400)
        .json({passwordincorrect: "Password incorrect"})
      }
    })
  })

}

module.exports = {signupUser, loginUser}
