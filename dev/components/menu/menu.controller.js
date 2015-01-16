/**
 * Created by vivaldi on 12/01/2015.
 */

angular.module('Moni.BlogEdit')
	.controller('MenuCtrl', function($rootScope, $scope, $location, $routeParams, PostsService, WriterService) {
		"use strict";

		PostsService.getPosts()
			.then(function(data) {
				$scope.posts = data.data.data;

				PostsService.watchNewPosts(function(newPost) {
					$scope.posts.push(newPost);
				})

			});


		$scope.isActivePost = function(post) {
			if(post._id === $routeParams.id) {
				return true;
			}
		};

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