/**
 * Created by vivaldi on 12/01/2015.
 */

angular.module('Moni.BlogEdit')
	.controller('MenuCtrl', function($rootScope, $scope, PostsService) {
		"use strict";

		PostsService.getPosts()
			.then(function(data) {
				$scope.posts = data.data.data;
			});

	});