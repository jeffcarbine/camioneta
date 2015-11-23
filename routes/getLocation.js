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
				latitude : coord.latitude,
				longitude : coord.longitude,
				status: coord.status,
			});
		})
		.catch(next);
});

module.exports = router;
