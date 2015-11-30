var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: String,
  password: String,
  lastCheckIn: Date,
  rewards: Number,
});

module.exports = mongoose.model('User', userSchema);
