/**
 * Created by vivaldi on 28/11/2014.
 */


'use strict';

angular.module('Moni.BlogEdit')
	.controller('NotificationCtrl', function($scope) {
		$scope.notifications = [];

		$scope.$on('event::notification', function(event, msg) {
			console.log("event::notification");
			msg.visible = true;
			$scope.notifications.push(msg);

			for(var i = 0; i<$scope.notifications.length; i++) {
				var notification = $scope.notifications[i];
				if(!notification.visible) {
					$scope.notifications.splice(i, 1);
				}
			}
		});
	});