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
		$scope.postSource			= "";
		$scope.postPreview			= "";
		$scope.editTitleActive		= false;
		$scope.savedPostTitle		= null;
		$scope.sourceFullscreen	= false;
		$scope.previewFullscreen	= false;
		$scope.linkFormOpen		= false;


		$timeout(function() {
			WriterService.getPost(_id, function(post) {
				$scope.post = post;
				$scope.getPostLabelText = function() {
					return WriterService.postLabelText(post);
				};

			});
		});

		$scope.getPostLabelColor = function(post) {
			return WriterService.postLabelColor(post);
		};

		if(!!_id) {
			WriterService.syncPost(_id, function(post) {
				$scope.post = post;
			});

			_autoSaveTimeout = $interval(function() {
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

		Mousetrap.bind('mod+b', function(e) {
			e.preventDefault();

			$log.debug('ctrl+b');
			$scope.post.text = WriterService.addTextFormatting($scope.post.text, 'bold');
		});

		Mousetrap.bind('mod+i', function(e) {
			e.preventDefault();

			$log.debug('ctrl+i');
			$scope.post.text = WriterService.addTextFormatting($scope.post.text, 'italic');
		});

		Mousetrap.bind('mod+h', function(e) {
			e.preventDefault();

			$log.debug('ctrl+h');
			$scope.post.text = WriterService.addTextFormatting($scope.post.text, 'header');
		});

		$scope.formatText = function(action, data) {
			data = data || null;
			$scope.post.text = WriterService.addTextFormatting($scope.post.text, action, data);
			$scope.linkFormOpen = false;
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
		};


		$scope.toggleLinkForm = function() {
			$scope.linkFormOpen = !$scope.linkFormOpen;
		};

		$scope.$watchCollection('post', function(newValue, oldValue) {

			if(!!newValue) {

				/*if(_autoSaveTimeout) {
					$timeout.cancel(_autoSaveTimeout);
				}*/


				var text = "";

				if(newValue.text.length) {

					text = newValue.text;

				}
				var preview = marked(text);
				$scope.postPreview = preview;
				//WriterService.savePost($scope.post, false);
				/*_autoSaveTimeout = $timeout(function() {
					WriterService.savePost($scope.post);
				}, 1000);*/
			}
		});

		$scope.$on('$destroy', function () { $interval.cancel(_autoSaveTimeout); });
	});
