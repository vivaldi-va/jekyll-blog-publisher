/**
 * Created by vivaldi on 21/01/2015.
 */


angular.module('Moni.BlogEdit')
	.directive('dropzone', function($log, $timeout) {
		"use strict";

		return {
			replace: true,
			restrict: 'A',
			scope: {
				'dropzone': '='
			},
			link: function(scope, element, attrs) {

				var config;
				var dropzone;

				config = scope.dropzone;

				$timeout(function () {

					$log.debug("dropzone config", scope);

					dropzone = new Dropzone(element[0], scope.dropzone.options);

					$log.debug("dropzone: ", dropzone);

					angular.forEach(scope.dropzone.eventHandlers, function (handler, event) {
						dropzone.on(event, handler);
					});

				});
			}
		}
	});