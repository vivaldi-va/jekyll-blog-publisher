/**
 * Created by vivaldi on 12/01/2015.
 */

angular.module('Moni.BlogEdit')
	.config(function ($routeProvider) {
		$routeProvider
			.when('/invite', {
				templateUrl: 'app/invite/invite.view.html',
				controller: 'InviteCtrl'
			});
	});