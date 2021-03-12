const express = require( "express" );
const mongoose = require( "mongoose" );
const bodyParser = require( "body-parser" );
const cors = require( "cors" );
const passport = require( "passport" );
require( "dotenv" ).config();

// import routes
const userRoutes = require( "./src/routes/user.routes" );

const app = express();

// Database Connection URL
const db = process.env.MONGO_URI;
mongoose
  .connect( db )
  .then( () => console.log( "db connected .." ) )
  .catch( ( error ) => console.log( error ) );

// body parser middleware 
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( {
  extended: false
} ) );

app.use( cors() );

// passport middleware
app.use( passport.initialize() );

// passport configuration
require( "./src/controllers/auth.controller" )( passport );

// serve routes to the server
app.use( "/users", userRoutes );

app.use( "/api", ( req, res ) => {
  res.status( 200 ).json( { api: "version 1" } );
} );

const port = process.env.PORT;
app.listen( port, function onStart( err ) {
  if ( err ) {
    console.log( err );
  }
  console.info( "Server started on port %s.", port );
} );
