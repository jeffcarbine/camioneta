var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/userSchema');

/* POST */
router.post('/', function(req, res, next) {
	var user = new User({
		email:req.body.email,
		password:req.body.password,
		lastCheckIn: new Date(),
		rewards: 1,
	});
	user.save(function(err, doc){
    if(err) {
    	return next(err);
    } else {
      res.json(user);
    }
  });
});

module.exports = router;
