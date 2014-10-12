/**
 * Created by vivaldi on 24/09/2014.
 */


angular.module('Moni.BlogEdit.Services')
	.factory('SocketService', function($log, socketFactory) {
		var _ioSocket = io('http://localhost:3010');
		var socket = socketFactory({
			ioSocket: _ioSocket
		});


		socket.on('connect', function() {
			$log.debug('socket connected');
		});

		function syncUpdates(modelName, cb) {
			cb = cb || angular.noop;

			socket.on(modelName + '::save', function(msg) {
				var event = modelName + '::save';
				cb(event, msg);
			});

			socket.on(modelName + '::remove', function(msg) {
				var event = modelName + '::remove';
				cb(event, msg);
			});
		}


		/**
		 * Send an socket message using a standard format.
		 *
		 * @param nameSpace - the namespace of the event, e.g. post, user
		 * @param method - the method to use, e.g. update, create, remove
		 * @param targetId - the id of the object to modify in the database, if applicable
		 * @param data - the JSON data payload to send, if applicable
		 */
		function sendEvent(nameSpace, method, targetId, data) {

			$log.debug("Moni.BlogEdit.Services.SocketService.sendEvent()", nameSpace + '::' + method);

			var event;
			targetId = targetId || null;
			if(!!targetId) {
				event = nameSpace + '::' + targetId + '::' + method;
			} else {
				event = nameSpace + '::' + method;
			}

			var eventObject = {
				event_id: null,
				event: event,
				data: data,
				timestamp: new Date()
			};

			socket.emit(event, eventObject);
		}


		return {
			socket: socket,
			sync: syncUpdates,
			sendEvent: sendEvent
		};
	});