/**
 * Created by vivaldi on 24/09/2014.
 */


angular.module('Moni.BlogEdit.Services')
	.factory('SocketService', function($rootScope, $log, $interval, socketFactory) {


		var socket;
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

				}, 1000);

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
			socket.emit(event, msg);
		}

		function on(event, cb) {
			"use strict";
			socket.on(event, cb);
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