/**
 * Created by Thomas on 11-5-2017.
 */

// API versie 3

var express = require('express');
var router = express.Router();
//var connector = require('../db/db_connection.js');
var pool = require('../db/db_connector.js');

router.get('/actors/:lastname?', function (req, res, next) {

	var lastname = req.params.lastname;

	var query_str;
	if (lastname) {
		query_str = 'SELECT * FROM actor_info WHERE last_name ="' + lastname + '";';
	} else {
		query_str = 'SELECT * FROM actor_info;';
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

var users = [
	{
		name: 'diederich',
		info: {
			email: 'dm.kroeske@avans.nl',
			nick: 'bug producer'
		}
	},
	{
		name: 'robin',
		info: {
			email: 'r.schellius@avans.nl',
			nick: 'bug fixer'
		}
	}
];

router.get('/users', function (req, res) {
	res.json(users);
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