require('dotenv').config()

var express = require('express')
var config = require('./config')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')

var app = express()

var port = process.env.PORT || 5757 // configure port

// database setup
mongoose.connect(config.database) // connect to database
app.set('superSecret', config.secret) // secret variable

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// app.set('views', './views/')
// app.set('view engine', 'ejs')

app.use('/auth', require('./router/authRouter.js'))
app.use('/play', require('./router/playRouter.js'))
app.use('/murid', require('./router/muridRouter.js'))
app.use('/kehadiran', require('./router/kehadiranRouter.js'))
app.get('/', function (req, res) {
  res.send('Welcome to KS Express!')
})

app.listen(port, function () {
  console.log(`App listening on port ${port}`)
})
