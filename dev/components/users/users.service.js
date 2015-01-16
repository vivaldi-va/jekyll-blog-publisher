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

		function logout() {
			$http({
				url: '/api/user/logout',
				method: 'delete'
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

		function invite(data) {
			return $http({
				url: '/api/user/invite',
				method: 'post',
				data: data,
				headers: {'Authorization': $rootScope.token}
			});
		}

		function inviteAcceptAuth(token) {
			return $http({
				url: '/api/user/accept/' + token,
				method: 'get'
			});
		}

		function inviteAccept(password, token) {
			return $http({
				url: '/api/user/accept',
				method: 'post',
				data: {password: password, token: token}
			})
				.then(function(data) {
					$rootScope.token = data.data.data.token;
					$rootScope.user = data.data.data.user;
				});
		}

		return {
			checkSession: checkSession,
			login: login,
			logout: logout,
			create: create,
			invite: invite,
			inviteAcceptAuth: inviteAcceptAuth,
			inviteAccept: inviteAccept
		};

	});