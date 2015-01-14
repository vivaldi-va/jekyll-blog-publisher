/**
 * Created by vivaldi on 08/01/2015.
 */

angular.module('Moni.BlogEdit')
	.factory('UserService', function($rootScope, $http, $log, SocketService) {
		"use strict";

		function create(user) {
			return $http({
				url: '/api/user/register',
				method: 'post',
				data: user
			})
				.then(function(data) {
					$rootScope.token = data.data.data.token;
					$rootScope.user	= data.data.data.user;
					SocketService.connect($rootScope.token);
				})
		}

		function login(user) {
			return $http({
				url: '/api/user/login',
				method: 'post',
				data: user
			})
				.then(function(data) {
					console.log(data);
					$rootScope.token = data.data.data.token;
					$rootScope.user	= data.data.data.user;

					SocketService.connect($rootScope.token);
				});
		}

		function checkSession() {
			return $http({
				url: '/api/user/session',
				method: 'get'
			})
				.then(function(data) {
					console.log("user", data.data.data);
					$rootScope.token = data.data.data.token;
					$rootScope.user = data.data.data.user;

					return data;
				});
		}

		return {
			checkSession: checkSession,
			login: login,
			create: create
		};

	});