/**
 * Created by vivaldi on 24/09/2014.
 */

var log			= require('log4js').getLogger('routes');
var config			= require('./config/config');

module.exports = function(app, io) {
	var postController	= require('./controllers/posts.controller')(io);

	app.get('/', function(req, res) {
		res.render('index.html');
	});



};

