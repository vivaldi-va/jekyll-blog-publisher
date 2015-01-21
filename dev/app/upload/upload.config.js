/**
 * Created by vivaldi on 21/01/2015.
 */

angular.module('Moni.BlogEdit')
	.config(function($routeProvider) {
		"use strict";
		$routeProvider
			.when('/upload', {
				templateUrl: 'app/upload/upload.view.html',
				controller: 'UploadCtrl'
			})
	});