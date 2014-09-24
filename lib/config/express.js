/**
 * Created by vivaldi on 24/09/2014.
 */


'use strict';

var express			= require('express');
var config				= require('./config');
var path				= require('path');
var compression		= require('compression');
var bodyParser			= require('body-parser');
var methodOverride	= require('method-override');
var cookieParser		= require('cookie-parser');
var errorHandler		= require('errorhandler');
var log4js				= require('log4js');
var log				= log4js.getLogger('app');

module.exports = function(app) {
	app.use(cookieParser("gO0g$I3qkEWr0X&C92*P/=aiL8NAV-"));
	app.set('views', config.root + '/app');
	app.engine('html', require('ejs').renderFile);

	if(process.env.NODE_ENV === 'production') {
		app.use('/', express.static(path.join(config.root, 'dist')));
	} else {
		app.use('/', express.static(path.join(config.root, 'app')));
	}

	app.use(log4js.connectLogger(log4js.getLogger('http'), { level: 'auto' }));

	app.use(compression());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
	app.use(methodOverride());
	app.use(function errorHandler(err, req, res, next) {
		log.error("Server error", process.domain.id, req.method, req.url, err);
		res.send(500, "Server error");
	});
};