/**
 * Created by vivaldi on 24/09/2014.
 */

var log			= require('log4js').getLogger('routes');
var config			= require('./config/config');

module.exports = function(app) {
	app.use('/api/post', require('./api/posts'));

	app.get('/', function(req, res) {
		res.render('index.html');
	});



};

