/* eslint no-param-reassign: ["error", { "props": false }] */
const Validator = require( "validator" );
const isEmpty = require( "is-empty" );

const signUpValidation = data => {
  const errors ={};

  // convert empty fields to empty strings in order to use validator functions
  data.name = !isEmpty( data.name ) ? data.name : "";
  data.email = !isEmpty( data.email ) ? data.email : "";
  data.password = !isEmpty( data.password ) ? data.password : "";
  data.password2 = !isEmpty( data.password2 ) ? data.password2 : "";

  // name check
  if ( Validator.isEmpty( data.name ) ){
    errors.name = "Name field is required";
  }

  // email checks
  if ( Validator.isEmpty( data.email ) ){
    errors.email = "Email field is required";
  } else if ( !Validator.isEmpty( data.email ) ){
    errors.email = "Email is invalid";
  }

  // password checks
  if ( Validator.isEmpty( data.password ) ){
    errors.password = "Password field is required";
  }

  if ( Validator.isEmpty( data.password2 ) ){
    errors.password2 = "Confirm Password field is required";
  }

  // password length checks 
  if ( !Validator.equals( data.password,{ min: 8, max: 50 } ) ){
    errors.password = "Password must ne at least 8 characters long";
  }
  if ( !Validator.equals( data.password, data.password2 ) ){
    errors.passwords2 = "Passwords must match";
  }

  return {
    errors, 
    isValid: isEmpty( errors )
  };

};

module.exports = signUpValidation;