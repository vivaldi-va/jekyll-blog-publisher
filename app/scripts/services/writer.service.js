/**
 * Created by vivaldi on 24/09/2014.
 */


angular.module('Moni.BlogEdit.Services')
	.factory('WriterService', function($resource, $log, localStorageService, SocketService, PostsService, OfflineService) {

		var POST_NAMESPACE	= "Moni.BlogEdit";
		var ACTIVE_POST_KEY	= POST_NAMESPACE + ".ActivePost";



		var crud = $resource('/api/post/:id', { id: '@_id' }, {
			update: {
				method: 'PUT'
			}
		});

		function Post(post) {
			this.body = post ||  {
				title: "untitled",
				text: ""
			};
		}

		function newPost() {
			$log.debug("Services.WriterService.newPost()");
			var postTemplate = {
				title: "untitled",
				text: ""
			};

			var post = new Post(postTemplate);

			OfflineService.upsert(ACTIVE_POST_KEY, post.body);
			return post.body;
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
			id = id || ACTIVE_POST_KEY;

			//SocketService.sendEvent('post', 'fetch', id);

			OfflineService.find(ACTIVE_POST_KEY, function(err, post) {

				$log.debug("fetching active post", post);

				if(!!post) {
					cb(post);
				} else {
					cb(newPost());
				}
			});
		}

		function savePost(post, saveToServer, cb) {
			saveToServer	= saveToServer || false;
			cb				= cb || angular.noop;

			// save the current post in localstorage under the 'active post' key
			OfflineService.upsert(ACTIVE_POST_KEY, post, function(err) {
				if(err) {
					$log.error('ERR', err);
				}
				cb(post);
			});

			if(!!saveToServer) {
				$log.debug("Moni.BlogEdit.Services.WriterService.savePost(saveToServer=true)");

				//SocketService.sendEvent('post', 'save', null, post);
				var postPromise = PostsService.create(post);
				$log.info(postPromise);
				return postPromise;
			}

		}

		return {
			resource: crud,
			newPost: newPost,
			getPost: getPost,
			savePost: savePost
		};

	});