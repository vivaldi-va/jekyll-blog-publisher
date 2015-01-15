/**
 * Created by vivaldi on 15/01/2015.
 */


angular.module('Moni.BlogEdit')
	.controller('AcceptCtrl', function($scope, $routeParams, $location, UserService) {
		"use strict";

		var token = $routeParams.token;
		$scope.isAuthed = false;

		UserService.inviteAcceptAuth(token)
			.then(function() {
				$scope.isAuthed = true;
			});

		$scope.submit = function() {
			UserService.inviteAccept($scope.password, token)
				.then(function() {
					$location.path('/write');
				});
		};

	});