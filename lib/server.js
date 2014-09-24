/**
 * Created by vivaldi on 24/09/2014.
 */
'use strict';

//log4js.configure('./config/log4js.json');

var log4js		= require('log4js');
log4js.configure('./lib/config/log4js.json');
var log		= log4js.getLogger('app');
var dbLog		= log4js.getLogger('db');
var fs			= require('fs');
var path		= require('path');
var express 	= require('express');
var mkdirp		= require('mkdirp');
var mongoose	= require('mongoose');
var config		= require('./config/config');
var app;
var server;
var io;
var db;
var modelsPath;




db = mongoose.connect("mongodb://localhost/moni", function (err) {
	if (err) {
		dbLog.error("Error connecting to mongodb", err);
	}
});

mongoose.connection.on('connected', function () {
	dbLog.info('Mongoose connected');
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
	dbLog.error('MONGODB', 'Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
	dbLog.info('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
	mongoose.connection.close(function () {
		dbLog.info('Mongoose default connection disconnected through app termination');
		process.exit(0);
	});
});


modelsPath = path.join(__dirname, './models');

// Load and require all the mongoose schemas
fs.readdirSync(modelsPath).forEach(function (file) {
	if (/(.*)\.(js$|coffee$)/.test(file)) {
		require(modelsPath + '/' + file);
	}
});



app		= express();
server	= require('http').createServer(app);
io		= require('socket.io')(server);

require('./config/express')(app);
require('./routes')(app, io);


server.listen(config.port, function() {
	log.info("Listening on port", config.port);
});

exports = module.exports = app;
