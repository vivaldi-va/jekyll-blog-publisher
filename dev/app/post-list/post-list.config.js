/**
 * Created by vivaldi on 12/01/2015.
 */

angular.module('Moni.BlogEdit')
	.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'app/post-list/post-list.view.html',
				controller: 'PostListCtrl'
			});
	});