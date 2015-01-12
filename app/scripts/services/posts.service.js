/**
 * Created by vivaldi on 15/10/2014.
 */


angular.module('Moni.BlogEdit.Services')
	.factory('PostsService', function($http, $rootScope, $q, $log) {

		function createPost(post) {

			var dfd = $q.defer();

			$http({
				url: '/api/post',
				method: 'post',
				data: post
			})
				.success(function(data, status) {
					$log.info("posting post was a success", data, status);
					dfd.resolve(data);
				})
				.error(function(data, status) {
					$log.error(data, status);
					dfd.reject(data, status);
				});

			return dfd.promise;
		}

		function getPosts() {
			"use strict";
			return $http({
				url: '/api/post',
				method: 'get',
				headers: {'Authorization': $rootScope.token}
			});
		}

		function getPostById(id) {
			"use strict";
			return $http({
				url: '/api/post/' + id,
				method: 'get',
				headers: {'Authorization': $rootScope.token}
			});
		}

		return {
			create: createPost,
			getPosts: getPosts,
			getPostById: getPostById
		};
	});