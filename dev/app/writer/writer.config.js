/**
 * Created by vivaldi on 12/01/2015.
 */

angular.module('Moni.BlogEdit')
	.config(function ($routeProvider) {
		$routeProvider
			.when('/write/:id', {
				templateUrl: 'app/writer/writer.view.html',
				controller: 'WriterCtrl'
			})
			.when('/write', {
				templateUrl: 'app/writer/writer.view.html',
				controller: 'WriterCtrl'
			});
	});