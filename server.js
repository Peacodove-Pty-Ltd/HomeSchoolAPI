const properties = require("./properties.js");
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require('cors');
const userRoutes = require("./src/routes/user.routes");

var socketio = require('socket.io'),
    http = require('http'), 
    uuid = require('node-uuid'),
    rooms = {},
    userIds = {};


const app = express();

app.use(bodyParser.json());
app.use(cors());
/*  app.use('/users', userRoutes) */
app.use('/api', (req, res) => {
  res.status(200).json({api: 'version 1'})
})

// Database Connection URL
authenticate();
console.info("MongoDB connected at: " + properties.Peacodove_db_dbUrl);

//start database
 async function authenticate() {
    console.info("Authenticating to the databases...");
    try {
      this.dbConnection_Peacodove_db = await mongoose.connect(
        "mongodb://" + properties.Peacodove_db_dbUrl,
        { useNewUrlParser: true }
      );
    } catch (err) {
      console.error(`Failed connection to the DB: ${err.message}`);
      console.error(err);
      await new Promise(resolve => setTimeout(resolve, 5000));
      await this.authenticate();
    }
  }

const port = process.env.PORT || 5000;
app.listen(port, function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info("Server started on port %s.", port);
});