/**
 * Created by vivaldi on 24/09/2014.
 */


angular.module('Moni.BlogEdit.Services')
	.factory('WriterService', function($rootScope, $location, $resource, $log, $http, $cookies,  localStorageService, SocketService, PostsService, OfflineService) {

		"use strict";

		var POST_NAMESPACE	= "Moni.BlogEdit";
		var ACTIVE_POST_KEY	= POST_NAMESPACE + ".ActivePost";
		var EDITOR_ELEMENT	= document.getElementById('edit-source');

		var crud = $resource('/api/post/:id', { id: '@_id' }, {
			update: {
				method: 'PUT'
			}
		});


		SocketService.on('post::saved', function(msg) {
			$log.debug("Post saved", msg);
			$rootScope.$broadcast('event::notification', {type: 'info', message: "Post saved"});
		});

		SocketService.on('post::published', function(msg) {
			$log.debug("Post published", msg);

			if(msg.isDraft) {

				$rootScope.$broadcast('event::notification', {type: 'info', message: "Post published as draft"});
			} else {
				$rootScope.$broadcast('event::notification', {type: 'success', message: "Post published"});
			}

		});




		function Post() {
			this.title = "untitled";
			this.text = ""
		}

		function newPost(cb) {
			$log.debug("Services.WriterService.newPost()");

			var post = new Post();

			$log.debug("new post", post);

			OfflineService.upsert(ACTIVE_POST_KEY, post, function() {
				cb(post);
			});
		}


		/**
		 * get a post by it's id. If no ID is defined then return the
		 * active post. if no active post is defined then create a new
		 * blank post and return that instead.
		 *
		 * @param id
		 * @param cb
		 */
		function getPost(id, cb) {
			//id = id || ACTIVE_POST_KEY;

			if(id) {
				OfflineService.find(id, function(err, post) {
					$log.debug("fetching active post", post);
					cb(post);
				});

				$log.debug("token should be defined", $rootScope.token);
				$http({
					url: '/api/post/' + id,
					method: 'get',
					headers: {'Authorization': $cookies['mblogedit.token']}
				})
					.success(function(data) {
						cb(data.data);
					});

			} else {
				newPost(function(post) {
					cb(post);
				});

			}

			OfflineService.find(id, function(err, post) {

				$log.debug("fetching active post", post);

				if(!!post) {
					cb(post);
				}
			});
		}

		function createPost(post, cb) {
			"use strict";
			SocketService.emit('post::create', post);
			SocketService.on('post::create', function(msg) {
				$location.path('/write/' + msg._id);
				$rootScope.$broadcast('event::notification', {type: 'info', message: "New post created"});
			});
		}

		function cachePost(post, cb) {
			cb = cb || angular.noop;
			var id = post._id || ACTIVE_POST_KEY;

			$log.debug("post cached in localstorage");

			// save the current post in localstorage under the 'active post' key
			OfflineService.upsert(id, post, function(err) {
				if(err) {
					$log.error('ERR', err);
				}
				cb(post);
			});
		}

		function savePost(post, cb) {
			cb = cb || angular.noop;

			$log.debug("Moni.BlogEdit.Services.WriterService.savePost(saveToServer=true)");

			SocketService.emit('post::save', post);



		}

		function syncPost(postId, cb) {
			"use strict";

			SocketService.on('post::updated', function(msg) {
				if(msg.error) {
					$log.error(msg.error);
				} else {

					if(postId === msg._id) {
						cb(msg);
					}
				}
			});
		}

		function addTextFormatting(post, type) {
			var startPos = EDITOR_ELEMENT.selectionStart;
			var endPos = EDITOR_ELEMENT.selectionEnd;
			var selectedText = post.substring(startPos, endPos);

			if(selectedText.length === 0) {
				return post;
			}

			var text;

			$log.debug("Selected text", selectedText);
			switch(type) {
				case 'bold':
					if(selectedText.match(/\*\*([\w\s]+)\*\*/)) {
						$log.info("already formatted");
						text = selectedText.replace(/\*\*([\w\s]+)\*\*/, "$1");
					} else {
						text = '**' + selectedText + '**';
					}
					break;
				case 'italic':
					if(selectedText.match(/_([\w\s]+)_/)) {
						$log.info("already formatted");
						text = selectedText.replace(/_([\w\s]+)_/, "$1");
					} else {
						text = '_' + selectedText + '_';
					}
					break;
				case 'header':
					if(selectedText.match(/###(\w+)/)) {
						$log.info("already formatted");
						text = selectedText.replace(/###([\w\s]+)/, "$1");
					} else {
						text = '###' + selectedText;
					}
					break;
			}

			return post.slice(0, startPos) + text + post.slice(endPos);
		}

		function postLabelColor(post) {
			var color = 'default';

			if(post.attrs.is_published) {
				if(post.attrs.is_draft) {
					color = 'blue';
				} else {
					color = 'green';
				}
			}

			return color;
		}

		function postLabelText(post) {
			var text = 'unpublished';

			if(post.attrs.is_published) {
				if(post.attrs.is_draft) {
					text = 'draft';
				} else {
					text = 'published';
				}
			}

			return text;
		}

		function publish(msg) {
			SocketService.emit('post::publish', msg);
		}

		return {
			resource: crud,
			newPost: newPost,
			getPost: getPost,
			createPost: createPost,
			savePost: savePost,
			syncPost: syncPost,
			cachePost: cachePost,
			addTextFormatting: addTextFormatting,
			postLabelColor: postLabelColor,
			postLabelText: postLabelText,
			publish: publish
		};

	});