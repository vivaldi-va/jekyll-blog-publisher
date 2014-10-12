'use strict';


angular.module('Moni.BlogEdit.Controllers', []);
angular.module('Moni.BlogEdit.Services', ['ngResource', 'btford.socket-io', 'LocalStorageModule']);
angular.module('Moni.BlogEdit.Directives', ['ngSanitize']);
angular.module('Moni.BlogEdit.Filters', []);
angular.module('Moni.BlogEdit.Config', ['ngRoute']);

/**
 * @ngdoc overview
 * @name Moni.BlogEdit
 * @description
 * # Moni.BlogEdit
 *
 * Main module of the application.
 */
angular
	.module('Moni.BlogEdit', [
		'Moni.BlogEdit.Controllers',
		'Moni.BlogEdit.Services',
		'Moni.BlogEdit.Directives',
		'Moni.BlogEdit.Filters',
		'Moni.BlogEdit.Config'
	]);

