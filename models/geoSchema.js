var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var geoSchema = new Schema({
  longitude: String,
  latitude: String,
});

module.exports = mongoose.model('Coord', geoSchema);
