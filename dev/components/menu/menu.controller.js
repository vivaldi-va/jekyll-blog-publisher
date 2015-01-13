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

		$scope.getPostLabelColor = function(post) {

			var color = 'default';

			if(post.attrs.is_published) {
				if(post.attrs.is_draft) {
					color = 'blue';
				} else {
					color = 'green';
				}
			}

			return color;
		};


		$scope.getPostLabelText = function(post) {
			var text = 'unpublished';

			if(post.attrs.is_published) {
				if(post.attrs.is_draft) {
					text = 'draft';
				} else {
					text = 'published';
				}
			}

			return text;
		};

	});