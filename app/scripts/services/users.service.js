/**
 * Created by vivaldi on 08/01/2015.
 */

angular.module('Moni.BlogEdit')
	.factory('UserService', function($rootScope, $http, SocketService) {
		"use strict";


		function login(user) {
			return $http({
				url: '/api/user/login',
				method: 'post',
				data: user
			})
				.then(function(data) {
					$rootScope.token = data.token;

					SocketService.connect();
				});
		}

		function checkSession() {
			return $http({
				url: '/api/user/session',
				method: 'get'
			});
		}

		return {
			checkSession: checkSession,
			login: login
		};

	});