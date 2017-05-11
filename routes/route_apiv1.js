/**
 * Created by Thomas on 11-5-2017.
 */

// API versie 3

var express = require('express');
var router = express.Router();
//var connector = require('../db/db_connection.js');
var pool = require('../db/db_connector.js');

router.get('/countries', function (req, res, next) {

	query_str = 'SELECT * FROM country;';

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

router.get('*', function (req, res) {
	res.json(
		{"msg": "Thank you for using API v3"}
	);
});

module.exports = router;