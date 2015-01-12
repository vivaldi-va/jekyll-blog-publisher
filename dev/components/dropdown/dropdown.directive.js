/**
 * Created by vivaldi on 20/11/2014.
 */

angular.module('Moni.BlogEdit')
	.directive('moDropdown', function() {
		return {
			restrict: 'EA',
			scope: true,
			transclude: true,
			replace: true,
			templateUrl: 'components/dropdown/dropdown.view.html',
			link: function(scope, element, attrs) {
				var drop = new Drop({
					target: angular.element(element[0].querySelector(".dropdown__Link"))[0],
					content: angular.element(element[0].querySelector(".dropdown__Target"))[0],
					position: 'bottom center',
					openOn: 'click',
					classes: '',
					tetherOptions: {
						attachment: 'top center',
						targetAttachment: 'bottom center',
						constraints: [
							{
								to: 'window',
								pin: true
							}
						]
					}
				});

			}
		};
	});