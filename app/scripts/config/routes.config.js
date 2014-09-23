/**
 * Created by vivaldi on 23/09/2014.
 */

angular.module('Moni.BlogEdit.Config')
	.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: '../../views/main.view.html',
				controller: 'MainCtrl'
			})
			.when('/about', {
				templateUrl: 'views/about.html',
				controller: 'AboutCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
	});