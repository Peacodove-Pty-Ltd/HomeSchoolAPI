const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());


// Database Connection URL
const db = "mongodb+srv://EKaxada:1234567890@cluster0.3bhqr.mongodb.net/EKaxada?retryWrites=true&w=majority";
// Use connect method to connect to the server

mongoose.connect(db).then(()=>console.log("db connected ..")).catch(err=>console.log(err))

const port = process.env.PORT || 3000;
app.listen(port, function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info("Server started on port %s.", port);
});