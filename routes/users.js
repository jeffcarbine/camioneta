var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/userSchema');

/* POST */
router.post('/', function(req, res, next) {
	var user = new User({
		username:req.query.username,
		password:req.query.password
	});
	user.save(function(err, doc){
    if(err) {
    	return next(err);
    } else {
      res.json(user);
    }
  });
})

module.exports = router;
