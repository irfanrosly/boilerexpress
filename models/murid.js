// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose')
var Schema = mongoose.Schema

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model(
  'Murid',
  new Schema({
    namaMurid: {type: String, required: true},
    idMurid: {type: String, required: true},
    kelas: {type: String, required: true},
    tahun: {type: Number, required: true}
  })
)
