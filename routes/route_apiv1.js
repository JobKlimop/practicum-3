/**
 * Created by Thomas on 11-5-2017.
 */

// API versie 3

var express = require('express');
var router = express.Router();
var pool = require('../db/db_connector.js');
var http = require('http');

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

router.post('/cities', function(req, res){
	var city = req.body;
	var query = {
		sql: 'INSERT INTO `city`(ID, Name, CountryCode, District, Population) VALUES (?, ?, ?, ?, ?)',
		values: [city.ID, city.Name, city.CountryCode, city.District, city.Population],
		timeout: 2000 // 2 seconde
	};

	console.dir(city);
	console.log("Values: " + query.values);
	console.log('Query:' + query.sql);

	res.contentType('application/json');
	pool.query(query, function(error, rows, fields){
		if(error){
			res.status(400);
			res.json(error);
		} else {
			res.status(200);
			res.json(rows);
		};
	});
});

router.put('/cities/:id?', function(req, res){
	var id = req.params.id;
	var city = req.body;
	var query = {
		sql: 'UPDATE `city` SET Population = ? WHERE ID = ' + id +'',
		values: [city.Population],
		timeout: 2000
	};

	console.dir(id);
	console.log("Values: " + query.values);
	console.log("Query: " + query.sql);

	res.contentType('application/json');
	pool.query(query, function(error, rows, fields){
        if(error){
            res.status(400);
            res.json(error);
        } else {
            res.status(200);
            res.json(rows);
        };
	});
});

router.delete('/cities/:id?', function(req, res){
	var id = req.params.id;
	var query = {
		sql: 'DELETE `city` WHERE id = ' + id + '',
		timeout: 2000
	};

	console.log("Query: " + query.sql);

	res.contentType('application/json');
	pool.query(query, function(error, rows, fields){
		if(error){
			res.status(400);
			res.json(error);
		} else {
			res.status(200);
			res.json(rows);
		};
	});
});

router.get('/countries/:code?', function (req, res, next) {

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

router.post('/countries', function(req, res){
    var country = req.body;
    var query = {
        sql: 'INSERT INTO `country`(Code, Name, Continent, Region, SurfaceArea, IndepYear, Population, LifeExpactancy, GNP, GNPOId, LocalName, GovernmentForm, HeadOfState, Capital, Code2) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        values: [country.Code, country.Name, country.Continent, country.Region, country.SurfaceAre, country.IndepYear, country.Population, country.LifeExpactancy, country.GNP, country.GNPOId, country.LocalName, country.GovernmentForm, country.HeadOfState, country.Capital, country.Code2],
        timeout: 2000 // 2 seconde
    };

    console.dir(country);
    console.log("Values: " + query.values);
    console.log('Query:' + query.sql);

    res.contentType('application/json');
    pool.query(query, function(error, rows, fields){
        if(error){
            res.status(400);
            res.json(error);
        } else {
            res.status(200);
            res.json(rows);
        };
    });
});

router.put('/countries/:code', function (req, res) {
	var code = req.params.code;
	var country = req.body;
	var query = {
		sql: 'UPDATE `country` SET Population=' + country.Population + ' WHERE Code="' + code + '"',
		timeout: 2000 // 2 seconde
	}

	console.log('Query: ' + query.sql);

	res.contentType('application/json');
	pool.query(query, function(error, rows, fields){
		if(error){
			res.status(400);
			res.json(error);
		} else {
			res.status(200);
			res.json(rows);
		};
	});
});

router.delete('/countries/:code', function (req, res) {
	var code = req.params.code;
	var query = {
		sql: 'DELETE FROM `country` WHERE Code="' + code + '"',
		timeout: 2000 // 2 seconde
	}

	console.log('Query: ' + query.sql);

	res.contentType('application/json');
	pool.query(query, function(error, rows, fields){
		if(error){
			res.status(400);
			res.json(error);
		} else {
			res.status(200);
			res.json(rows);
		};
	});
});

router.get('/search', function (req, res) {
	var type = req.query.type || '';
	var limit = req.query.limit || '';

	if(type == 'city' && limit != ''){

	}
	else if(type == 'country'  && limit != ''){
		var continent = req.query.continent || '';

		var query = {
			sql: 'SELECT * FROM `country` WHERE Continent="' + continent + '" LIMIT ' + limit,
			timeout: 2000 // 2 seconde
		}

		console.log('Query: ' + query.sql);

		res.contentType('application/json');
		pool.query(query, function (error, rows, fields) {
			if (error) {
				res.status(400);
				res.json(error);
			} else {
				res.status(200);
				res.json(rows);
			}
			;
		});
	}
	else {
		res.contentType('application/json');
		res.status(400);
		res.json({"error":"not a valid query"});
	}
});

module.exports = router;