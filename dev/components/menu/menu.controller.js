/**
 * Created by vivaldi on 12/01/2015.
 */

angular.module('Moni.BlogEdit')
	.controller('MenuCtrl', function($rootScope, $scope, $location, PostsService, WriterService) {
		"use strict";

		PostsService.getPosts()
			.then(function(data) {
				$scope.posts = data.data.data;
			});

		$scope.getPostLabelColor = function(post) {

			return WriterService.postLabelColor(post);
		};


		$scope.getPostLabelText = function(post) {
			return WriterService.postLabelText(post);
		};

		$scope.goto = function(post) {
			$rootScope.menu = false;
			$location.path('/write/' + post._id);
		}

	});