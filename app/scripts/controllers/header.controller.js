/**
 * Created by vivaldi on 24/09/2014.
 */


angular.module('Moni.BlogEdit.Controllers')
.controller('HeaderCtrl', function($scope, $location, WriterService) {

		$scope.newPost = function() {
			WriterService.newPost();
			$location.path('/write');
		};

});