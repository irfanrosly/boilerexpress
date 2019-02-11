let path = require("path");
var bcrypt = require("bcrypt");
var User = require("../models/user"); // get mongoose User Model
var jwt = require("jsonwebtoken"); // used to create, sign, and verify tokens

const express = require("express"),
  router = express.Router();

var app = express();
app.set("superSecret", process.env.SECRET); // secret variable

// making use of normal routes
router.get("/", (req, res) => {
  res.send("path : " + __dirname);
});

router.get("/forgot-password", (req, res) => {
  res.send("path : " + __dirname);
});

router.post("/register", function(req, res) {
  if (req.body.name) {
    if (req.body.password) {
      let password = bcrypt.hashSync(req.body.password, 10);

      // create a sample user
      var nick = new User({
        name: req.body.name,
        password: password,
        admin: false
      });

      // save the sample user
      nick.save(function(err) {
        if (err) throw err;
        console.log("User saved successfully");
        res.json({ success: true });
      });
    } else {
      res.send("Please input password!");
    }
  } else {
    res.send("Please input username@name!");
  }
});

router.post("/login", function(req, res) {
  User.findOne(
    {
      name: req.body.name
    },
    function(err, user) {
      if (err) throw err;
      if (!user) {
        res.json({
          success: false,
          message: "Authentication failed. User not found."
        });
      } else if (user) {
        var result = bcrypt.compareSync(req.body.password, user.password);
        // check if password matches
        if (!result) {
          res.json({
            success: false,
            message: "Authentication failed. Wrong password."
          });
        } else {
          // if user is found and password is right
          // create a token with only our given payload
          // we don't want to pass in the entire user since that has the password
          const payload = {
            admin: user.admin
          };
          var token = jwt.sign(payload, app.get("superSecret"), {
            expiresIn: 86400 // expires in 24 hours
          });
          // return the information including token as JSON
          res.json({
            success: true,
            expires_in: 86400,
            access_token: token
          });
        }
      }
    }
  );
});

// exporting thee router to other modules
module.exports = router;
