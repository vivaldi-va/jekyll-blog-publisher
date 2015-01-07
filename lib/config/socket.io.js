/**
 * Created by vivaldi on 24/09/2014.
 */

var config = require('./config');
var log	= require('log4js').getLogger('socket');

function _onConnect(socket, io) {
	require('../api/posts/posts.socket.js').register(socket, io);
}

module.exports = function(socketio) {
	socketio.on('connection', function(socket) {
		log.debug("Connected to socket");

		socket.connectedAt = new Date();

		_onConnect(socket, socketio);
	});
};