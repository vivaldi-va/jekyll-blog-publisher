/**
 * Created by vivaldi on 24/09/2014.
 */

var PostModel	= require('mongoose').model('Post');
var PostCtrl	= require('../controllers/posts.controller');
var log		= require('log4js').getLogger('socket::post');

log.debug("Moni.Api.Sockets.Posts");

exports.register = function(socket) {

	socket.on('post::save', function(msg) {
		log.debug("post:update", msg);

		var returnMessage = {
			event: msg.event,
			timestamp: new Date(),
			data: null,
			error: null
		};

		PostCtrl.save(msg.data, function(err, post) {
			if(err) {
				returnMessage.error = err;
			} else {
				returnMessage.data = post;
			}

			socket.emit(msg.event, returnMessage);
		});

	});


};