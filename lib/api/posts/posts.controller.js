/**
 * Created by vivaldi on 24/09/2014.
 */


var Joi			= require('joi');
var PostModel	= require('./posts.model');
var log		= require('log4js').getLogger('Controllers.Post');

function _createNewPost(post, cb) {
	process.nextTick(function() {

		PostModel.create(post, function(err, doc) {
			if(err) {
				log.error("Error creating new post entry", err);
				cb(err);
			} else {
				cb(null, doc);
			}
		});
	});
}

function _updatePost(post, cb) {
	PostModel.findOne({_id: post._id}, function(err, doc) {
		if(err) {
			log.error("Error finding post", err);
			cb(err);
		} else if(!doc) {
			log.warn("Post " + id + " not found");
		} else {
			doc.text						= post.text;
			doc.title						= post.title;
			doc.attrs.modified.timestamp	= new Date();


			doc.save(function(err) {
				if(err) {
					log.error("Updating post failed", err);
					cb(err);
				} else {
					//log.debug("post saved", doc);
					cb(null, doc);
				}
			});
		}
	});
}


/**
 *	fetch all posts
 */
exports.index = function(req, res) {

};


/**
 * fetch individial post by id
 */
exports.show = function(req, res) {

};

exports.create = function(req, res) {

	var returnModel = {
		data: null,
		message: null,
		error: null
	};

	var schema = Joi.object().keys({
		title: Joi.string().max(255).required(),
		text: Joi.string().allow('').required()
	});





	Joi.validate(req.body, schema, {allowUnknown: true}, function(err, value) {
		if(err) {
			//log.warn("Validation error", err);
			returnModel.error = err;
			res.status(400).send(returnModel)

		} else {
			var post = req.body;

			if(!post._id) {
				_createNewPost(value, function(err, doc) {
					if(err) {
						log.error("error creating new post", err);
						res.status(500).send(err);
					} else {

						//log.debug("created new post", doc);
						returnModel.data = doc.toObject();
						res.status(201).send(returnModel);
					}
				});
			} else {
				_updatePost(post, function(err, post) {
					if(err) {
						log.error("error updating post", err);
						returnModel.error = err;
						res.status(500).send(returnModel);
					} else {
						returnModel.data = post;
						res.status(200).send(returnModel);
					}
				});
			}

		}
	});



};

exports.update = function() {};
exports.destroy = function() {};