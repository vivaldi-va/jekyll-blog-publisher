/**
 * Created by vivaldi on 15/10/2014.
 */


angular.module('Moni.BlogEdit.Services')
	.factory('PostsService', function($http, $q, $log) {

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

		return {
			create: createPost
		};
	});