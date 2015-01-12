/**
 * Created by vivaldi on 24/09/2014.
 */


angular.module('Moni.BlogEdit.Controllers')
.controller('HeaderCtrl', function($rootScope, $scope, $location, WriterService) {

		$scope.toggleMenu = function() {
			"use strict";
			$rootScope.menu = !$rootScope.menu;
		};

});