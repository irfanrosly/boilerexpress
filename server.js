require("dotenv").config(); // initialise .env file as early ass possible in application

var express = require("express"); // import express
var mongoose = require("mongoose"); // import mongoose for our db
var bodyParser = require("body-parser"); // import body-parser to handle our request body

var app = express(); // initialise express application

var port = process.env.PORT || 5757; // configure port

mongoose.connect(process.env.DB); // connect to database

app.use(bodyParser.urlencoded({ extended: false })); // setting our application to use the body-parser
app.use(bodyParser.json());

app.use("/api/v1/auth", require("./router/authRouter.js")); // import authRouter
app.use("/api/v1/play", require("./router/playRouter.js")); //import playRouter

// default route of the application
app.get("/api/v1", function(req, res) {
  res.send("Welcome to KS Express!");
});

// start our app based on port declaration above
app.listen(port, function() {
  console.log(`App listening on port ${port}`);
});
