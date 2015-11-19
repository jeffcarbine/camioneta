var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Coord = require('../models/locationSchema');

/* GET */
router.get('/', function(req, res, next) {

	Coord
		.findOne().sort('-date')
		.then(function(coord) {
			res.json({
				longitude : coord.longitude,
				latitude : coord.latitude,
				date: coord.date
			});
		})
		.catch(next);
});

module.exports = router;
