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




		Mousetrap.bind('mod+s', function(e) {
			e.preventDefault();

			$log.debug('ctrl+s');

			//SocketService.
			WriterService.savePost($scope.post, true);
		});




		SocketService.sync('post', function(event, msg) {
			$log.debug(event, msg);
		});




		$scope.$watchCollection('post', function(newValue, oldValue) {
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
					WriterService.savePost($scope.post);
				}, 1000);
			}
		});
	});
