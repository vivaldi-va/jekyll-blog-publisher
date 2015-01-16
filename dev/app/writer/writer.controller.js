'use strict';

/**
 * @ngdoc function
 * @name Moni.BlogEdit.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the Moni.BlogEdit
 */
angular.module('Moni.BlogEdit.Controllers')
	.controller('WriterCtrl', function ($rootScope, $scope, $log, $timeout, $interval, $routeParams, WriterService, ModalService) {
		var _id = $routeParams.id || false;
		var _autoSaveTimeout;
		$scope.postSource		= "";
		$scope.postPreview		= "";
		$scope.editTitleActive	= false;
		$scope.savedPostTitle	= null;
		$scope.sourceFullscreen = false;
		$scope.previewFullscreen = false;


		$timeout(function() {
			WriterService.getPost(_id, function(post) {
				$scope.post = post;
				$log.debug('Init post', $scope.post);

				$scope.getPostLabelColor = function() {
					return WriterService.postLabelColor(post);
				};

				$scope.getPostLabelText = function() {
					return WriterService.postLabelText(post);
				};

			});
		});


		if(!!_id) {
			WriterService.syncPost(_id, function(post) {
				$log.debug("Post sync'd", post);
				$scope.post = post;
			});

			$interval(function() {
				WriterService.savePost($scope.post);
			}, 1000*60);
		}



		$scope.startTitleEdit = function() {
			$scope.savedPostTitle	= angular.copy($scope.post.title);
			$scope.editTitleActive = true;
		};

		$scope.cancelTitleEdit = function() {
			$scope.post.title = $scope.savedPostTitle;
			$scope.editTitleActive = false;
		};

		$scope.saveTitleEdit = function() {
			$scope.savedPostTitle	= $scope.post.title;
			WriterService.cachePost($scope.post);
			WriterService.savePost($scope.post);

			$scope.editTitleActive = false;
		};



		Mousetrap.bind('mod+s', function(e) {
			e.preventDefault();

			$log.debug('ctrl+s');

			if(!_id) {
				WriterService.createPost($scope.post);
			} else {
				//WriterService.cachePost($scope.post);
				WriterService.savePost($scope.post);
			}
		});

		$scope.formatText = function(action) {
			$scope.post.text = WriterService.addTextFormatting($scope.post.text, action);
		};

		$scope.publishDraft = function() {
			$scope.post.attrs.is_published = true;
			WriterService.publish({id: $scope.post._id, isDraft: true});

		};

		$scope.publishLive = function() {
			$scope.post.attrs.is_published = true;
			$scope.post.attrs.is_draft = false;
			WriterService.publish({id: $scope.post._id, isDraft: false});
		};


		$scope.toggleFullscreen = function(window) {

			switch(window) {
				case 'preview':
					if($scope.previewFullscreen) {
						$scope.previewFullscreen = false;
					} else {
						$scope.previewFullscreen = true;
						$scope.sourceFullscreen = false;
					}
					break;

				case 'source':
					if($scope.sourceFullscreen) {
						$scope.sourceFullscreen = false;
					} else {
						$scope.sourceFullscreen = true;
						$scope.previewFullscreen = false;
					}
					break;
			}

			if($scope.previewFullscreen) {
			} else {}
		}


		$scope.$watchCollection('post', function(newValue, oldValue) {
			$log.debug('new value', newValue);

			if(!!newValue) {

				/*if(_autoSaveTimeout) {
					$timeout.cancel(_autoSaveTimeout);
				}*/


				var text = "";

				if(newValue.text.length) {

					text = newValue.text;

				}
				var preview = marked(text);
				$log.debug(preview);
				$scope.postPreview = preview;
				//WriterService.savePost($scope.post, false);
				/*_autoSaveTimeout = $timeout(function() {
					WriterService.savePost($scope.post);
				}, 1000);*/
			}
		});
	});
