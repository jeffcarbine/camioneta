var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Coord = require('../models/locationSchema');

/* POST */
router.post('/', function(req, res, next) {
	var coord = new Coord({
		longitude:req.body.longitude,
		latitude:req.body.latitude,
		date:req.body.date,
		status:req.body.status,
	});
	coord.save(function(err, doc){
    if(err) {
    	return next(err);
    } else {
      res.json(coord);
    }
  });
});

module.exports = router;
