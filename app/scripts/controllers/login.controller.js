/**
 * Created by vivaldi on 08/01/2015.
 */

angular.module('Moni.BlogEdit')
	.controller('LoginCtrl', function($scope, $location, UserService) {
		"use strict";

		$scope.submit = function() {
			UserService.login({
				email: $scope.email,
				password: $scope.password
			})
				.then(function(data) {
					$location.path('/write');
				});
		}

	});