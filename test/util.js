/**
 * Created by vivaldi on 05/10/2014.
 */

'use strict';

/*
 * Modified from https://github.com/elliotf/mocha-mongoose
 */


console.log("test/util.js");
var mongoose	= require('mongoose');
var log		= require('log4js').getLogger('test::util');

// ensure the NODE_ENV is set to 'test'
// this is helpful when you would like to change behavior when testing
process.env.NODE_ENV = 'test';

before(function (done) {


	function reconnect() {
		log.info('UTIL', "Reconnecting to test database");
		mongoose.connect('mongodb://localhost/moni', function (err) {
			if (err) {
				throw err;
			}
		});
	}

	switch (mongoose.connection.readyState) {
		case 0:
			reconnect();
			break;
		case 1:
			done();
			break;
	}

	mongoose.connection.on('connected', function () {
		log.info("UTIL", "Connected to DB", mongoose.connection.readyState);
		(function clearDB() {
			log.info('UTIL', "clearing test database");
			for (var i in mongoose.connection.collections) {
				mongoose.connection.collections[i].remove(function() {
					log.debug("removed collection", i);
				});
			}
		})();
		done();
	});
});

afterEach(function (done) {
	return done();
});