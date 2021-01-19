const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api', (req, res) => {
  res.status(200).json({api: 'version 1'})
})

// Database Connection URL
const db = "mongodb+srv://EKaxada:1234567890@cluster0.3bhqr.mongodb.net/EKaxada?retryWrites=true&w=majority";
// Use connect method to connect to the server

mongoose.connect(db).then(()=>console.log("db connected ..")).catch(err=>console.log(err))

const port = process.env.PORT || 8000;
app.listen(port, function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info("Server started on port %s.", port);
});