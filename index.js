/**
 * Created by Thomas on 5/11/2017.
 */

var http        = require('http');
var express     = require('express');
var config      = require('./config.json');
var bodyParser  = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({'extended' : 'true'}));

app.set('PORT', config.webPort);

app.all('*', function(req, res, next){
    console.log(JSON.stringify(req.headers));
    console.log(req.method + " " + req.url);
    next();
});

app.get('/api/v1/', function(req,res,next){
    res.contentType('application/json');
});

app.use('/apiv1', require('./routes/route_apiv1'));


//Start the server
var port = process.env.PORT || app.get('PORT');

app.listen(port, function(){
    console.log('The magic happens at http://localhost:' + port)
});

module.exports = app;