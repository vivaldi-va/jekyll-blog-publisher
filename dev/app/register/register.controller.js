/**
 * Created by vivaldi on 13/01/2015.
 */

angular.module('Moni.BlogEdit')
	.controller('RegisterCtrl', function($scope, $location, UserService) {
		"use strict";

		$scope.register = function() {
			UserService.create({
				email: $scope.email,
				password: $scope.password,
				firstname: $scope.firstname,
				lastname: $scope.lastname
			})
				.then(function() {
					$location.path('/');
				});
		};

	});