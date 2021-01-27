const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./src/routes/user.routes");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use("/users", userRoutes);

app.use("/", (req, res) => {
  res.status(200).json({ api: "version 1" });
});

// Database Connection URL
const db =
  "mongodb+srv://EKaxada:1234567890@cluster0.3bhqr.mongodb.net/EKaxada?retryWrites=true&w=majority";
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("db connected .."))
  .catch((err) => console.log(err));

const port = process.env.PORT || 5000;
app.listen(port, function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info("Server started on port %s.", port);
});
