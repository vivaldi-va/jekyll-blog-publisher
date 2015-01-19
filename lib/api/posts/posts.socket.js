/**
 * Created by vivaldi on 24/09/2014.
 */

var jwt			= require('jsonwebtoken');
var PostModel	= require('./posts.model');
var PostCtrl	= require('./posts.controller');
var log		= require('log4js').getLogger('socket::post');

log.debug("Moni.Api.Sockets.Posts");


function _fetchPosts(id, cb) {
	"use strict";
	id = id || null;

	var query = {};

	if(!!id) {
		query = {_id: id};
	}

	PostModel.find(query, function(err, result) {
		if(err) {
			return cb(err);
		}

		cb(null, result);
	});
}

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
			_fetchPosts(null, function(err, result) {
				"use strict";
				io.sockets.emit('postlist::update', result);
			});
		})
	});

	socket.on('post::save', function(msg) {

		var userId = jwt.decode(socket.handshake.query.token);

		PostCtrl.update(msg, userId, function(err, post) {
			if(err) {
				socket.emit('err', err);
				return;
			}

			socket.emit('post::saved', post);
			io.sockets.emit('post::updated', post);

			_fetchPosts(null, function(err, result) {
				"use strict";
				io.sockets.emit('postlist::update', result);
			});
		});

	});

	socket.on('post::publish', function(msg) {
		"use strict";
		log.debug('post::publish');

		PostCtrl.publish(msg.id, msg.isDraft, function(err, post) {
			socket.emit('post::published', msg);
			io.sockets.emit('post::updated', post);

			_fetchPosts(null, function(err, result) {
				"use strict";
				io.sockets.emit('postlist::update', result);
			});
		});
	})


};