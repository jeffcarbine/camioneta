var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/userSchema');

/* GET */
router.get('/', function(req, res, next) {
	var email = req.session.user.email;

	User
		.findOne({
			email: email,
		})
		.then(function(user) {
			res.json({
				lastCheckIn: user.lastCheckIn,
			});
		})
		.catch(next);
});

/* POST */
router.post('/', function(req, res, next) {
var email = req.session.user.email;

	User
		.findOneAndUpdate({
			email: email,
		},{
			$set: {lastCheckIn: new Date()},
			$inc: {rewards : 1}
		})
		.then(function(user) {
			console.log(user);
		});
});

module.exports = router;
