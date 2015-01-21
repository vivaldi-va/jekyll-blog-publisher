/**
 * Created by vivaldi on 21/01/2015.
 */


angular.module('Moni.BlogEdit')
	.controller('UploadCtrl', function($scope) {
		"use strict";


		function _dropzoneSending(file, xhr, formData) {

		}

		function _dropzoneSuccess(file, response) {

		}

		$scope.dropzoneConfig = {
			options: {
				url: '/api/post/upload'
			},
			eventHandlers: {
				'sending': _dropzoneSending,
				'success': _dropzoneSuccess
			}
		};




	});