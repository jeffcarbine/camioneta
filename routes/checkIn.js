var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/userSchema');

/* GET */
router.get('/', function(req, res, next) {
	var user = req.session.email;

	User
		.findOne()
		.then(function(user) {
			res.json({
				lastCheckIn: user.lastCheckIn,
			});
		})
		.catch(next);
});

module.exports = router;
