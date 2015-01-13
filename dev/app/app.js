'use strict';


angular.module('Moni.BlogEdit.Controllers', []);
angular.module('Moni.BlogEdit.Services', ['ngResource', 'btford.socket-io', 'LocalStorageModule']);
angular.module('Moni.BlogEdit.Directives', ['ngSanitize']);
angular.module('Moni.BlogEdit.Filters', []);
angular.module('Moni.BlogEdit.Config', []);

/**
 * @ngdoc overview
 * @name Moni.BlogEdit
 * @description
 * # Moni.BlogEdit
 *
 * Main module of the application.
 */
angular
	.module('Moni.BlogEdit', [
		'ngCookies',
		'ngRoute',
		'ngAnimate',
		'Moni.BlogEdit.Controllers',
		'Moni.BlogEdit.Services',
		'Moni.BlogEdit.Directives',
		'Moni.BlogEdit.Filters',
		'Moni.BlogEdit.Config'
	])
	.run(function($rootScope, $location, $log, UserService, SocketService) {
		UserService.checkSession()
			.then(function(data) {
				var path = $location.path();
				$log.debug("Session success", data.data.data.token); // i dont even...
				$rootScope.token = data.data.data.token;
				SocketService.connect(data.data.data.token);
				$location.path(path);


			}, function(data, status) {
				$log.warn('Session check failed, log back in');
				$location.path('/login');
			});
	})
	.run(function($rootScope, $log) {
		$rootScope.$watch('socket', function(newVal) {
			$log.debug("socket changed: ", newVal);
		});
	})
	.run(function($rootScope) {
		$rootScope.menu = false;
	});

