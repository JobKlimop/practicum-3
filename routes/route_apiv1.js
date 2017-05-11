/**
 * Created by Thomas on 11-5-2017.
 */

// API versie 3

var express = require('express');
var router = express.Router();
var pool = require('../db/db_connector.js');

router.get('/cities/:id?', function (req, res, next) {

	var id = req.params.id;

	var query_str;
	if (id) {
		query_str = 'SELECT * FROM city WHERE ID ="' + id + '";';
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

router.get('/countries:code', function (req, res, next) {

	var code = req.params.code;

	var query_str;

	if (code) {
		query_str = 'SELECT * FROM country WHERE Code ="' + code + '";';
	} else {
		query_str = 'SELECT * FROM country;';
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