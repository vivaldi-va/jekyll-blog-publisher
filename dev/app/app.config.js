/**
 * Created by vivaldi on 23/09/2014.
 */

angular.module('Moni.BlogEdit')
	.config(function ($routeProvider) {
		$routeProvider
			.otherwise({
				redirectTo: '/write'
			});
	});