const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const userRoutes = require("./src/routes/user.routes");

const app = express();

// Database Connection URL
const db = process.env.MONGO_URI;
mongoose
  .connect(db)
  .then(() => console.log("db connected .."))
  .catch((err) => console.log(err));

app.use(bodyParser.json());
app.use(cors());
app.use("/users", userRoutes);

app.use("/api", (req, res) => {
  res.status(200).json({ api: "version 1" });
});

const port = process.env.PORT;
app.listen(port, function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info("Server started on port %s.", port);
});
