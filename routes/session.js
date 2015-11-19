var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/userSchema');

/* POST */
router.post('/', function(req, res, next) {
	User
    .findOne({
      email: req.body.email,
      password: req.body.password
    })
    .then(function(user){
      if (!user)
        { return res.status(404).json({
          error: 'User not found',
          message: 'No user found.',
        });
			}
			delete user.password;
      req.session.user = user;
			res.json(user);
    })
		.catch(next);
});

/* GET */
router.get('/', function(req, res, next) {
	if(req.session.user) {
		return res.json(req.session.user);
	}
	res.sendStatus(404);
});

module.exports = router;
