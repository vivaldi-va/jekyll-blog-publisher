/**
 * Created by vivaldi on 13/01/2015.
 */

angular.module('Moni.BlogEdit')
	.config(function ($routeProvider) {
		$routeProvider
			.when('/register', {
				templateUrl: 'app/register/register.view.html',
				controller: 'RegisterCtrl'
			});
	})