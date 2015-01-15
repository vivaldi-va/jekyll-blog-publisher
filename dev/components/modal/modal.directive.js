/**
 * Created by vivaldi on 26/11/2014.
 */


angular.module('Moni.BlogEdit')
	.directive('moModal', function() {
		return {
			restrict: 'EA',
			templateUrl: 'components/modal/modal.view.html',
			scope: {
				active: '='
			},
			link: function(scope, element, attrs) {
				//if(!!scope.active)
			}
		};
	});