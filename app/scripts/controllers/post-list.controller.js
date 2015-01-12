'use strict';

/**
 * @ngdoc function
 * @name Moni.BlogEdit.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the Moni.BlogEdit
 */
angular.module('Moni.BlogEdit.Controllers')
	.controller('PostListCtrl', function ($scope, $log, $location, PostsService, WriterService) {
		/*$scope.post = {
			name: "a post name to test with",
			meta: {
				contributors: [
					{name: "some contributor"},
					{name: "another contributor"}
				]
			}
		};*/

		$scope.posts = null;

		$scope.goto = function(post) {
			$location.path('/write/' + post._id);
		};

		PostsService.getPosts()
			.then(function(data) {
				$scope.posts = data.data.data;
			});



	});
