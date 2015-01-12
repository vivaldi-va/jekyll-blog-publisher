/**
 * Created by vivaldi on 28/11/2014.
 */

'use strict';

angular.module('Moni.BlogEdit')
	.directive('moNotification', function($log, $timeout) {
		return {
			restrict: 'EA',
			replace: true,
			scope: {
				notification: '='
			},
			templateUrl: 'components/notifications/notification.view.html',
			link: function(scope, element, attrs) {

				var timeout;
				function close() {
					scope.notification.visible = false;
				}

				function _closeAfterTimeout() {
					if(scope.notification.type !== 'error') {
						return $timeout(function() {
							close();
						}, 4000);
					}

					return null;
				}

				scope.test = function(action) {
					$log.debug(action);
				};

				scope.closeNotification = function() {
					close();
				};

				scope.stopTimeout = function() {
					if(timeout) {
						$log.debug("stop notification timeout");
						$timeout.cancel(timeout);
					}
				};

				element.parent().bind('click', function() {
					$log.debug('notification clicked');
					$timeout(function() {
						close();
					});
				});

				element.parent().bind('mouseleave', function() {
					$log.debug("restart notification timeout");
					if(scope.notification.type !== 'error') {
						timeout = _closeAfterTimeout();
					}
				});


				scope.startTimeout = function() {
					$log.debug("restart notification timeout");
					if(scope.notification.type !== 'error') {
						timeout = _closeAfterTimeout();
					}
				};

				scope.$watch('notification', function(newValue, oldValue) {
					if(scope.notification.type !== 'error') {
						timeout = _closeAfterTimeout();
					}
				});
			}
		};
	});