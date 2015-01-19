/**
 * Created by vivaldi on 24/09/2014.
 */
'use strict';

//log4js.configure('./config/log4js.json');

var log4js		= require('log4js');
var logConfig = require('./config/log4js.json');
if(process.env.NODE_ENV === 'development') {
	log4js.configure(logConfig.development);
} else {
	log4js.configure(logConfig.heroku);
}
var log		= log4js.getLogger('app');
var dbLog		= log4js.getLogger('db');
var fs			= require('fs');
var path		= require('path');
var express 	= require('express');
var mkdirp		= require('mkdirp');
var mongoose	= require('mongoose');
var config		= require('./config/env');
var app;
var server;
var io;
var db;
var modelsPath;




db = mongoose.connect(config.mongo.uri, function (err) {
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
		dbLog.info('Mongoose default connection disconnected through dev termination');
		process.exit(0);
	});
});


modelsPath = path.join(__dirname, './models');

// Load and require all the mongoose schemas
/*fs.readdirSync(modelsPath).forEach(function (file) {
	if (/(.*)\.(js$|coffee$)/.test(file)) {
		require(modelsPath + '/' + file);
	}
});*/



app 	= exports.app = express();
server	= require('http').createServer(app);
io		= require('socket.io')(server);

require('./config/express')(app);
require('./config/socket.io')(io);
require('./routes')(app, io);
require('./utils/seed-db.util')();


server.listen(config.port, function() {
	log.info("Listening on port %d in %s mode", config.port, config.env);

	require('./api/users/users.model').findOne({email: "wildtangomedia@gmail.com"}, function(err, user) {

		if(err) {
			log.error("error finding user", err);
		}

		if(!user) {
			require('./api/invites/invites.model').create({
				email: "wildtangomedia@gmail.com",
				name: {first: "zac", last: "price"},
				permissions: {can_publish: true, can_invite: true},
				token: "suchtoken"
			}, function(err) {
				if(err) {
					log.error("Error creating initial invite", err);
					return;
				}

				log.info("Created initial user invite");
			});

		}
	})

});
