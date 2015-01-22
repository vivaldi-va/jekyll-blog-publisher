/**
 * Created by vivaldi on 21/01/2015.
 */

angular.module('Moni.BlogEdit')
	.controller('UploadModalCtrl', function($scope, $log, close, post) {
		"use strict";

		$scope.post = post;
		$scope.dropzoneConfig = {
			options: {
				url: '/api/post/upload'
			},
			eventHandlers: {
				'sending': _dropzoneSending,
				'success': _dropzoneSuccess
			}
		};
		function _dropzoneSending(file, xhr, formData) {
			$log.debug('sending file');
		}

		function _dropzoneSuccess(file, response) {
			$log.debug("uploaded file", file);
			$log.debug("upload resposne", response);
			close(response.data);
		}

		$scope.close = function() {
			close();
		};



	});