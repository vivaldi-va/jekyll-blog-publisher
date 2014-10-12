/**
 * Created by vivaldi on 24/09/2014.
 */


var Joi			= require('joi');
var PostModel	= require('mongoose').model('Post');
var log		= require('log4js').getLogger('Controllers.Post');


exports.save = function(post, cb) {

	var schema = Joi.object().keys({
		title: Joi.string().max(255).required(),
		text: Joi.string().required()
	});

	function _createNewPost(post) {
		PostModel.create(post, function(err, doc) {
			if(err) {
				log.error("Error creating new post entry", err);
				cb(err);
			} else {
				cb(null, doc);
			}
		});
	}

	function _updatePost(post) {
		PostModel.findOne({_id: post._id}, function(err, doc) {
			if(err) {
				log.error("Error finding post", err);
				cb(err);
			} else {
				log.debug("I should update something here I think");
			}


		});
	}

	Joi.validate(post, schema, {allowUnknown: true}, function(err, value) {
		if(err) {
			log.warn("Validation error", err);
			cb(err);
		} else {

			if(!post._id) {
				_createNewPost(value);
			} else {
				_updatePost(post)
			}

		}
	});



};