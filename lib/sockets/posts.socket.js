/**
 * Created by vivaldi on 24/09/2014.
 */

var PostModel	= require('mongoose').model('Post');
var log		= require('log4js').getLogger('socket::post');

log.debug("Moni.Api.Sockets.Posts");

exports.register = function(socket) {
	socket.on('post:update', function(msg) {
		log.debug("post:update");
	});

	socket.emit('post:test', {data: 'hue'});
};