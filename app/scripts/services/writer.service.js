/**
 * Created by vivaldi on 24/09/2014.
 */


angular.module('Moni.BlogEdit.Services')
	.factory('WriterService', function($resource, $log, localStorageService, SocketService, OfflineService) {

		var POST_NAMESPACE	= "Moni.BlogEdit";
		var ACTIVE_POST_KEY	= POST_NAMESPACE + ".ActivePost";



		var crud = $resource('/api/posts/:id', { id: '@_id' }, {
			update: {
				method: 'PUT'
			}
		});

		function newPost() {
			var postTemplate = {
				title: "untitled",
				text: "",
				checksum: OfflineService.createKey()
			};

			OfflineService.upsert(ACTIVE_POST_KEY, postTemplate);
			return postTemplate;
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

			OfflineService.find(ACTIVE_POST_KEY, function(err, post) {

				console.log(post);

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

			OfflineService.upsert(ACTIVE_POST_KEY, post, function(err) {
				if(err) {
					$log.error('ERR', err);
				}
				cb();
			});

			if(!!saveToServer) {
				$log.debug("Moni.BlogEdit.Services.WriterService.savePost(saveToServer=true)");

				if(!post._id) {
					post.checksum = OfflineService.createKey();
				}

				SocketService.sendEvent('post', 'save', null, post);
			}

		}

		return {
			resource: crud,
			newPost: newPost,
			getPost: getPost,
			savePost: savePost
		};

	});