'use strict';


angular.module('Moni.BlogEdit.Config', ['ngRoute']);
angular.module('Moni.BlogEdit.Controllers', []);
angular.module('Moni.BlogEdit.Services', []);
angular.module('Moni.BlogEdit.Directives', []);
angular.module('Moni.BlogEdit.Filters', []);

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
		'Moni.BlogEdit.Config',
		'Moni.BlogEdit.Controllers',
		'Moni.BlogEdit.Services',
		'Moni.BlogEdit.Directives',
		'Moni.BlogEdit.Filters'
	]);

