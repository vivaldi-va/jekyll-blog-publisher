/**
 * Created by vivaldi on 24/09/2014.
 */


angular.module('Moni.BlogEdit.Services')
	.factory('WriterService', function($location, $resource, $log, $http, localStorageService, SocketService, PostsService, OfflineService) {

		"use strict";

		var POST_NAMESPACE	= "Moni.BlogEdit";
		var ACTIVE_POST_KEY	= POST_NAMESPACE + ".ActivePost";
		var socket = SocketService.socket;


		var crud = $resource('/api/post/:id', { id: '@_id' }, {
			update: {
				method: 'PUT'
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

				$http({
					url: '/api/post/' + id,
					method: 'get'
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
			});
		}

		function cachePost(post, cb) {
			cb = cb || angular.noop;
			var id = post.id || ACTIVE_POST_KEY;

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

			SocketService.emit('post::updated', function(msg) {
				if(msg.error) {
					$log.error(msg.error);
				} else {

					if(postId === msg._id) {
						cb(msg);
					}
				}
			});
		}

		return {
			resource: crud,
			newPost: newPost,
			getPost: getPost,
			createPost: createPost,
			savePost: savePost,
			syncPost: syncPost,
			cachePost: cachePost
		};

	});