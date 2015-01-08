/**
 * Created by vivaldi on 24/09/2014.
 */

var jwt			= require('jsonwebtoken');
var PostModel	= require('./posts.model');
var PostCtrl	= require('./posts.controller');
var log		= require('log4js').getLogger('socket::post');

log.debug("Moni.Api.Sockets.Posts");

exports.register = function(socket, io) {

	socket.on('post::create', function(msg) {
		log.debug("post::create", msg);

		var userId = jwt.decode(socket.handshake.query.token);

		PostCtrl.create(userId, msg, function(err, post) {
			if(err) {
				log.error(err);
				socket.emit('err', err);
				return;
			}

			io.sockets.emit('post::create', post);
		})
	});

	socket.on('post::save', function(msg) {
		log.debug("post::save", msg);

		PostCtrl.update(msg, function(err, post) {
			if(err) {
				socket.emit('err', err);
				return;
			}

			socket.emit('post::updated', post);
		});

	});


};