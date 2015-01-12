/**
 * Created by vivaldi on 12/01/2015.
 */

angular.module('Moni.BlogEdit')
	.config(function ($routeProvider) {
		$routeProvider
			.when('/login', {
				templateUrl: 'app/login/login.view.html',
				controller: 'LoginCtrl'
			});
	});