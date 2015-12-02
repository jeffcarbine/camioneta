var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var locationSchema = new Schema({
  longitude: Number,
  latitude: Number,
  date: Date,
  status: Number, // 0 = open, 1 = moving, 2 = closed
});

module.exports = mongoose.model('Coord', locationSchema);
