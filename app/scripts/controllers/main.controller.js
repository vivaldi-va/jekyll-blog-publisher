'use strict';

/**
 * @ngdoc function
 * @name Moni.BlogEdit.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the Moni.BlogEdit
 */
angular.module('Moni.BlogEdit.Controllers')
	.controller('MainCtrl', function ($scope, $log, localStorageService, WriterService) {
		$scope.post = {
			name: "a post name to test with",
			meta: {
				contributors: [
					{name: "some contributor"},
					{name: "another contributor"}
				]
			}
		};




	});
