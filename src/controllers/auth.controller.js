/* eslint-disable camelcase */

const jwt = require( "passport-jwt" );

const JwtStrategy = jwt.Strategy;
const { ExtractJwt } = jwt;
require( "dotenv" ).config();

// import user model
const User = require( "../models/user.model" );

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy( options, ( jwt_payload, done )=> {
      User.findById( jwt_payload.id )
        .then( user=> {
          if ( user ){
            return done( null, user ); // eslint-disable-line unicorn/no-null
          }
          return done( null, false ); // eslint-disable-line unicorn/no-null
        } )
        .catch( error=> console.error( error ) ); // eslint-disable-line no-console
    } )
  );
};