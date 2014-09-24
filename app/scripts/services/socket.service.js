/**
 * Created by vivaldi on 24/09/2014.
 */


angular.module('Moni.BlogEdit.Services')
	.factory('SocketService', function(socketFactory) {
		var _ioSocket = io('http://localhost:3010');
		var socket = socketFactory({
			ioSocket: _ioSocket
		});

		console.log(socket);

		socket.on('connect', function() {
			console.log('connected');
		});

		function syncUpdates(modelName, cb) {
			cb = cb || angular.noop;

			socket.on(modelName + ':save', function(item) {

			});

			socket.on(modelName + ':remove', function(item) {

			});

			socket.on(modelName + ':test', function(item) {
				cb(item);
			});
		}


		return {
			socket: socket,
			sync: syncUpdates
		};
	});