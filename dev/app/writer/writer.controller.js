'use strict';

/**
 * @ngdoc function
 * @name Moni.BlogEdit.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the Moni.BlogEdit
 */
angular.module('Moni.BlogEdit.Controllers')
	.controller('WriterCtrl', function ($rootScope, $scope, $log, $timeout, $routeParams, WriterService, SocketService) {
		var _id = $routeParams.id || false;
		var _autoSaveTimeout;
		$scope.postSource		= "";
		$scope.postPreview		= "";
		$scope.editTitleActive	= false;
		$scope.savedPostTitle	= null;


		$timeout(function() {
			WriterService.getPost(_id, function(post) {
				$scope.post = post;
				$log.debug('Init post', $scope.post);
			});
		});


		if(!!_id) {
			WriterService.syncPost(_id, function(post) {
				$scope.post = post;
			});
		}



		$scope.startTitleEdit = function() {
			$scope.savedPostTitle	= angular.copy($scope.post.title);
			$scope.editTitleActive = true;
		};

		$scope.cancelTitleEdit = function() {
			$scope.post.title = $scope.savedPostTitle;
			$scope.editTitleActive = false;
		};

		$scope.saveTitleEdit = function() {
			$scope.savedPostTitle	= $scope.post.title;
			WriterService.cachePost($scope.post);
			WriterService.savePost($scope.post);

			$scope.editTitleActive = false;
		};



		Mousetrap.bind('mod+s', function(e) {
			e.preventDefault();

			$log.debug('ctrl+s');

			if(!_id) {
				WriterService.createPost($scope.post);
			} else {
				WriterService.cachePost($scope.post);
				WriterService.savePost($scope.post);
			}
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
					WriterService.cachePost($scope.post);
				}, 1000);
			}
		});
	});
