/**
 * Created by vivaldi on 13/01/2015.
 */

angular.module('Moni.BlogEdit')
	.controller('InviteCtrl', function($scope, $location, UserService) {
		"use strict";

		$scope.invitesuccess = false;

		$scope.submit = function() {
			UserService.invite({
				email: $scope.email,
				firstname: $scope.firstname,
				lastname: $scope.lastname,
				canpublish: $scope.canpublish,
				caninvite: $scope.caninvite
			})
				.then(function() {
					$scope.invitesuccess = true;
				});
		};

	});