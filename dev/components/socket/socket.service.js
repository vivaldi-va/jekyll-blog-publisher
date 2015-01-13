/**
 * Created by vivaldi on 24/09/2014.
 */


angular.module('Moni.BlogEdit.Services')
	.factory('SocketService', function($rootScope, $log, $interval, $timeout, socketFactory) {


		var socket;
		var _emitterQueue = [];

		$rootScope.socket = socket = null;


		function _heartBeat() {
			"use strict";
			if(socket.connected) {

				$interval(function() {

					if(!socket) {
						connect($rootScope.token);
					}

					if(socket.disconnected) {
						connect($rootScope.token);
					}

					if(!!socket.connected) {
						_sendQueuedEvent();
					}

				}, 500);

			}
		}

		function connect(token) {
			$log.debug("Socket connecting");
			"use strict";

			socket = io({ query: "token=" + token });


			socket.on('connect', function() {
				$log.debug('socket connected');
				_heartBeat();
			});
		}

		function emit(event, msg) {
			"use strict";
			msg = msg || {};
			//socket.emit(event, msg);
			_emitterQueue.push({event: event, msg: msg})
		}

		function on(event, cb) {
			"use strict";

			if(!socket) {
				$timeout(function() {
					on(event, cb);
				}, 1000);
			} else {
				socket.on(event, cb);
			}

		}

		/**
		 * Send all events from the event queue, if there are any
		 * @private
		 */
		function _sendQueuedEvent() {

			if(_emitterQueue.length > 0) {
				//$log.debug("emitter queue", _emitterQueue);
				var event = _emitterQueue.shift();
				$log.debug('SOCKET', "Savings.Services.SocketService.sendQueuedEvent(" + event.event + ")");

				socket.emit(event.event, event.msg);
				//_emitterQueueCache.push(event);
				_sendQueuedEvent();
			}
		}


		/*$rootScope.$watch('token', function(newVal) {
			connect(newVal);
		});*/


		return {
			socket: socket,
			connect: connect,
			emit: emit,
			on: on
		};
	});