require("dotenv").config();

var express = require("express");
var config = require("./config");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var app = express();

var port = process.env.PORT || 5757; // configure port

// database setup
mongoose.connect(process.env.DB); // connect to database

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/v1/auth", require("./router/authRouter.js"));
app.use("/api/v1/play", require("./router/playRouter.js"));
app.get("/api/v1", function(req, res) {
  res.send("Welcome to KS Express!");
});

app.listen(port, function() {
  console.log(`App listening on port ${port}`);
});
