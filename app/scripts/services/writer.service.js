/**
 * Created by vivaldi on 24/09/2014.
 */


angular.module('Moni.BlogEdit.Services')
	.factory('WriterService', function($resource) {
		var crud = $resource('/api/posts/:id', { id: '@_id' }, {
			update: {
				method: 'PUT'
			}
		});

		return crud;

	});