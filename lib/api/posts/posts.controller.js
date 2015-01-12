/**
 * Created by vivaldi on 24/09/2014.
 */


var Joi			= require('joi');
var jwt			= require('jsonwebtoken');
var PostModel	= require('./posts.model');
var UserModel	= require('../users/users.model');
var log		= require('log4js').getLogger('Controllers.Post');

function ReturnModel(data, error, message) {
	this.model = {
		data: data || null,
		message: message || null,
		error: error || null
	};
}

function _createNewPost(post, cb) {

	PostModel.create(post, function(err, doc) {
		if(err) {
			log.error("Error creating new post entry", err);
			cb(err);
		} else {
			cb(null, doc);
		}
	});
}

function _updatePost(post, cb) {
	PostModel.findOne({_id: post._id}, function(err, doc) {
		if(err) {
			log.error("Error finding post", err);
			cb(err);
		} else if(!doc) {
			log.warn("Post " + post._id + " not found");
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
	PostModel.find({}, function(err, docs) {
		if(err) {
			log.error("error finding posts", err);
			res.status(500).send(new ReturnModel(null, err, null).model);
		} else {
			res.status(200).send(new ReturnModel(docs, null, null).model);
		}
	})
};


/**
 * fetch individial post by id
 */
exports.show = function(req, res) {
	PostModel.findOne({_id: req.params.id}, function(err, doc) {
		if(err) {
			res.status(404).send(new ReturnModel(null, err, null).model);
		} else {
			res.status(200).send(new ReturnModel(doc, null, null).model);
		}
	});
};

exports.create = function(userId, post, cb) {

	if(!post) {
		return cb({code: 'ENOPOST'});
	}

	var schema = Joi.object().keys({
		title: Joi.string().max(255).required(),
		text: Joi.string().allow('').required()
	});

	Joi.validate(post, schema, {allowUnknown: true}, function(err, validatedPost) {
		if(err) {
			return cb({code: 'EVALIDATION', error: err, message: err.validationError});

		}

		UserModel.findOne({_id: userId}, function(err, user) {
			"use strict";

			if(err) {
				log.error("error finding user", err);
				return cb({code: 'ESRV', error: err});
			}

			if(!user) {
				log.error("No user found");
				return cb({code: 'ENOUSER', error: err});
			}

			validatedPost.meta = {
				author: {},
				post_date: new Date()
			};

			validatedPost.meta.author = {
				_id: user._id,
				name: {
					first: user.name.first,
					last: user.name.last
				},
				last_contribution: new Date()
			};

			_createNewPost(validatedPost, function(err, doc) {
				if(err) {
					log.error("error creating new post", err);
					return cb({code: 'ESRV', error: err});
				}

				log.debug("created new post", doc);
				cb(null, doc);

			});

		});


	});
};

exports.update = function(post, cb) {
	"use strict";
	_updatePost(post, function(err, post) {
		if(err) {
			log.error("error updating post", err);
			return cb({code: 'ESRV', error: err});
		}

		cb(null, post);
	});
};



exports.destroy = function() {};