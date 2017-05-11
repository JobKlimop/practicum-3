/**
 * Created by Thomas on 11-5-2017.
 */

// API versie 3

var express = require('express');
var router = express.Router();
var pool = require('../db/db_connector.js');

router.get('/cities/:name?', function (req, res, next) {

	var name = req.params.name;

	var query_str;
	if (name) {
		query_str = 'SELECT * FROM city WHERE name ="' + name + '";';
	} else {
		query_str = 'SELECT * FROM city;';
	}

	pool.getConnection( function (err, connection) {
		if(err){ throw error }
		connection.query(query_str, function (err, rows, fields) {
			connection.release();
			if(err){ throw error }
			res.status(200).json(rows);
		});
	});
});

router.get('/help', function (req, res) {
	res.json({"msg": "Help function"});
});

module.exports = router;