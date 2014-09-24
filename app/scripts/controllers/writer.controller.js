'use strict';

/**
 * @ngdoc function
 * @name Moni.BlogEdit.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the Moni.BlogEdit
 */
angular.module('Moni.BlogEdit.Controllers')
	.controller('WriterCtrl', function ($scope, $log, SocketService) {
		$scope.postSource		= "";
		$scope.postPreview		= "";

		SocketService.sync('post', function(item) {
			$log.debug('test came back in callback');
		});

		$scope.$watch('postSource', function(newValue, oldValue) {
			if(!!newValue) {
				var preview = marked(newValue);
				$log.debug(preview);
				$log.debug(oldValue);
				$scope.postPreview = preview;
			}
		});
	});
