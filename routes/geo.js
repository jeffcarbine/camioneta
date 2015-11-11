var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/geoSchema');

/* POST */
router.post('/', function(req, res, next) {
	var user = new Coord({
		longitude:req.body.longitude,
		latitude:req.body.latitude
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
