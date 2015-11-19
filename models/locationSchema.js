var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var locationSchema = new Schema({
  longitude: String,
  latitude: String,
  date: Number,
});

module.exports = mongoose.model('Coord', locationSchema);
