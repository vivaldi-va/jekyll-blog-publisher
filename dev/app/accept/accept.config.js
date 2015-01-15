/**
 * Created by vivaldi on 15/01/2015.
 */


angular.module('Moni.BlogEdit')
	.config(function($routeProvider) {
		"use strict";
		$routeProvider
			.when('/accept/:token', {
				templateUrl: 'app/accept/accept.view.html',
				controller: 'AcceptCtrl'
			});
	});