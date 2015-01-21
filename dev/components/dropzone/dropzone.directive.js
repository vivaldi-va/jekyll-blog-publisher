/**
 * Created by vivaldi on 21/01/2015.
 */


angular.module('Moni.BlogEdit')
	.directive('dropzone', function($log) {
		"use strict";
		return function(scope, element, attrs) {

			var config;
			var dropzone;

			config = scope[attrs.dropzone];

			dropzone = new Dropzone(element[0], config.options);

			$log.debug("dropzone: ", dropzone);


			angular.forEach(config.eventHandlers, function(handler, event) {
				dropzone.on(event, handler);
			});

		}
	});