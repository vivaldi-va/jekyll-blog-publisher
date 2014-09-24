/**
 * Created by vivaldi on 24/09/2014.
 */


angular.module('Moni.BlogEdit.Services')
	.factory('SocketService', function(socketFactory) {
		var _ioSocket = io('');
		var socket = socketFactory({
			ioSocket: ioSocket
		});

		function syncUpdates(modelName, cb) {
			cb = cb || angular.noop;

			socket.on(modelName + ':save', function(item) {

			});


			socket.on(modelName + ':remove', function(item) {

			});
		}


		return {
			socket: socket,
			sync: syncUpdates
		};
	});