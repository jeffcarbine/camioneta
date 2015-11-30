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
	console.log('This is where I will update the user to have one more point!');
});

module.exports = router;
