/**
 * Created by vivaldi on 23/09/2014.
 */

angular.module('Moni.BlogEdit.Config')
	.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/main.view.html',
				controller: 'MainCtrl'
			})
			.when('/write/:id', {
				templateUrl: 'views/writer.view.html',
				controller: 'WriterCtrl'
			})
			.when('/write', {
				templateUrl: 'views/writer.view.html',
				controller: 'WriterCtrl'
			})
			.when('/login', {
				templateUrl: 'views/login.view.html',
				controller: 'LoginCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
	});