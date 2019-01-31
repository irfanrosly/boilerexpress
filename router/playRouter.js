let path = require('path')
var bcrypt = require('bcrypt')
var User = require('../models/user') // get mongoose User Model
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

const express = require('express'),
  router = express.Router()

router.use(function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers.authorization

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, 'superSecret', function (err, decoded) {
      if (err) {
        return res.json({
          success: false,
          message: 'Failed to authenticate token.'
        })
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded
        next()
      }
    })
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    })
  }
})

// making use of normal routes
router.get('/', (req, res) => {
  console.log(req.query)
  res.send('Play:Home')
})

module.exports = router
