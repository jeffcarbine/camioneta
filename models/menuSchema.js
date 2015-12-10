var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var menuSchema = new Schema({
  name: String,
  price: Number,
  rewardValue: Number,
  isAddOn: Boolean, // false means it's a menu item
});

module.exports = mongoose.model('User', userSchema);
