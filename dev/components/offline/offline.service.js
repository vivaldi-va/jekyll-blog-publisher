/**
 * Created by vivaldi on 25/09/2014.
 */

angular.module('Moni.BlogEdit.Services')
	.factory('OfflineService', function($log) {


		/**
		 * set new LocalStorage entry, or if one exists, update it
		 *
		 * @param key
		 * @param data
		 * @param cb
		 */
		function upsert(key, data, cb) {

			cb = cb || angular.noop;

			//data.timestamp = new Date();

			if(!window.localStorage) {
				cb(new Error("LocalStorage not supported"));
			} else {
				if(window.localStorage[key]) {
					window.localStorage[key] = JSON.stringify(data);
					window.localStorage[key + '.timestamp'] = JSON.stringify(new Date());
				} else {
					window.localStorage.setItem(key, JSON.stringify(data));
				}

				cb();
			}
		}

		function find(key, cb) {

			if(!cb) {
				throw new Error("Callback needs to be defined for OfflineServices.find() to work");
			}

			if(!window.localStorage) {
				cb(new Error("LocalStorage not supported"));
			} else {
				if(localStorage.getItem(key)) {
					console.log(JSON.parse(localStorage.getItem(key)));
					cb(null, JSON.parse(localStorage.getItem(key)));
				} else {
					$log.debug("no active post found, creating new one");
					cb(null, false);
				}
			}
		}

		function createSyncKey() {
			return CryptoJS.MD5(new Date().getTime().toString()).toString();
		}

		return {
			upsert: upsert,
			find: find,
			createKey: createSyncKey
		}
	});