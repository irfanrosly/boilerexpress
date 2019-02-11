var jwt = require("jsonwebtoken"); // used to create, sign, and verify tokens

const express = require("express"),
  router = express.Router();
var app = express();
app.set("superSecret", process.env.SECRET); // secret variable

router.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers.authorization;

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, app.get("superSecret"), function(err, decoded) {
      if (err) {
        return res.json({
          success: false,
          message: "Failed to authenticate token."
        });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // if there is no token
    // return an error
    return res.status(401).send({
      success: false,
      message: "Invalid token provided."
    });
  }
});

// making use of normal routes
router.get("/", (req, res) => {
  console.log(req.query);
  res.send("Play:Home");
});

module.exports = router;
