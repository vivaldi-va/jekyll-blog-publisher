'use strict';

/**
 * @ngdoc function
 * @name Moni.BlogEdit.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the Moni.BlogEdit
 */
angular.module('Moni.BlogEdit.Controllers')
	.controller('WriterCtrl', function ($scope, $log, $timeout, $routeParams, WriterService, SocketService) {
		var _id = $routeParams.id || false;
		var _autoSaveTimeout;
		$scope.postSource		= "";
		$scope.postPreview		= "";


		WriterService.getPost(_id, function(post) {
			$scope.post = post;
			$log.debug('Init post', $scope.post);
		});


		/*SocketService.sync('post', function(event, msg) {
			$log.debug(event, msg);
			if(!!_id) {
				if(msg.data._id === _id) {
					$scope.post = msg.data;
				}
			} else {
				if($scope.post.checksum === msg.data.checksum) {
					$scope.post = msg.data;
				}
			}
			$scope.post = msg.data;
		});*/


		Mousetrap.bind('mod+s', function(e) {
			e.preventDefault();

			$log.debug('ctrl+s');

			//SocketService.
			WriterService.savePost($scope.post, true)
				.then(function success(success) {
					$log.debug(success);
					$scope.post = success.data;
					WriterService.savePost($scope.post, false);
				},
				function(reason) {
					$log.error(reason);
				});
		});



		$scope.$watchCollection('post', function(newValue, oldValue) {
			$log.debug('new value', newValue);

			if(!!newValue) {

				if(_autoSaveTimeout) {
					$timeout.cancel(_autoSaveTimeout);
				}

				if(newValue.text.length) {
					var preview = marked(newValue.text);
					$log.debug(preview);
					$scope.postPreview = preview;
				}


				$log.debug('Current post state', $scope.post);
				//WriterService.savePost($scope.post, false);
				_autoSaveTimeout = $timeout(function() {
					WriterService.savePost($scope.post, function(post) {
						$scope.post = post;
					});
				}, 1000);
			}
		});
	});
