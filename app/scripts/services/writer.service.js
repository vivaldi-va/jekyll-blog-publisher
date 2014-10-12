/**
 * Created by vivaldi on 24/09/2014.
 */


angular.module('Moni.BlogEdit.Services')
	.factory('WriterService', function($resource, $log, localStorageService, SocketService, OfflineService) {

		var ACTIVE_POST_KEY = "Moni.BlogEdit.ActivePost";

		var postTemplate = {
			title: "untitled",
			text: ""
		};

		var crud = $resource('/api/posts/:id', { id: '@_id' }, {
			update: {
				method: 'PUT'
			}
		});

		function newPost() {
			OfflineService.upsert(ACTIVE_POST_KEY, postTemplate);
		}

		function getPost(id, cb) {
			id = id || ACTIVE_POST_KEY;

			OfflineService.find(ACTIVE_POST_KEY, function(err, post) {
				console.log(post);
				cb(post);
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