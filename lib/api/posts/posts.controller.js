/**
 * Created by vivaldi on 24/09/2014.
 */


var Joi			= require('joi');
var jwt			= require('jsonwebtoken');
var multiparty	= require('multiparty');
var Grid		= require('gridfs-stream');
var mongoose	= require('mongoose');
var crypto		= require('crypto');
var PostModel	= require('./posts.model');
var UserModel	= require('../users/users.model');
var config		= require('../../config/env');
var log		= require('log4js').getLogger('Controllers.Post');


Grid.mongo = mongoose.mongo;

function ReturnModel(data, error, message) {
	this.data = data || null;
	this.message= message || null;
	this.error= error || null;
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


function _createFileName(oldName) {
	"use strict";

	var ext = oldName.split('.').pop();

	return crypto.createHash('md5').update(new Date().getTime().toString()).digest('hex') + '.' + ext;
}

/**
 *	fetch all posts
 */
exports.index = function(req, res) {
	PostModel.find({}, function(err, docs) {
		if(err) {
			log.error("error finding posts", err);
			res.status(500).send(new ReturnModel(null, err, null));
		} else {
			res.status(200).send(new ReturnModel(docs, null, null));
		}
	})
};


/**
 * fetch individial post by id
 */
exports.show = function(req, res) {
	PostModel.findOne({_id: req.params.id}, function(err, doc) {
		if(err) {
			res.status(404).send(new ReturnModel(null, err, null));
		} else {
			res.status(200).send(new ReturnModel(doc, null, null));
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

				//log.debug("created new post", doc);
				cb(null, doc);

			});

		});


	});
};

exports.update = function(post, userId, cb) {
	"use strict";
	function _save(doc, cb) {
		doc.save(function(err) {
			if(err) {
				log.error("Updating post failed", err);
				return cb({code: 'ESRV', error: err});
			} else {
				//log.debug("post saved", doc);
				cb(null, doc);
			}
		});
	}

	PostModel.findOne({_id: post._id}, function(err, doc) {
		if(err) {
			if(err) {
				log.error("error updating post", err);
				return cb({code: 'ESRV', error: err});
			}
		}

		if(!doc) {
			log.warn("Post " + post._id + " not found");
			return cb({code: 'ENOTFOUND'});
		}

		if(doc.attrs.status === 'published' && doc.text !== post.text) {
			doc.attrs.status = 'edited';
		} else if(doc.attrs.status === 'draft' && doc.text !== post.text) {
			doc.attrs.status = 'unpublished';
		}

		doc.text						= post.text;
		doc.title						= post.title;
		doc.attrs.modified.timestamp	= new Date();
		doc.category					= post.category;

		if(doc.meta.author._id.toString() !== userId) {

			var contributorIdExists = false;

			for(var i = 0; i<doc.meta.contributors.length; i++) {
				var contributor = doc.meta.contributors[i];

				//log.debug(userId, contributor._id.toString());

				if(contributor._id.toString() === userId) {
					contributorIdExists = true;
					contributor.last_contribution = new Date();
					break;
				}
			}

			if(!contributorIdExists) {

				UserModel.findOne({_id: userId}, function(err, user) {

					if(err) {
						return cb(null, err);
					}

					doc.meta.contributors.push({
						_id: userId,
						name: {
							first: user.name.first,
							last: user.name.last
						},
						last_contribution: new Date()
					});

					_save(doc, cb);

				});
			} else {
				_save(doc, cb);
			}
		} else {
			_save(doc, cb);
		}


	});
};

exports.publish = function(postId, isDraft, cb) {
	"use strict";

	PostModel.findOne({_id: postId}, function(err, post) {
		if(err) {
			return cb({code: 'ESRV', error: err});
		}

		if(!post) {
			return cb('ENOPOST');
		}

		if(!!isDraft) {
			post.attrs.status = "draft";
		} else {
			post.attrs.status = "published";
			post.attrs.publish_date = new Date();
		}

		post.save(function(err) {
			if(err) {
				return cb({code: 'ESRV', error: err});
			}

			cb(null, post);
		});
	})

};

exports.uploadHeaderImage = function(req, res) {
	"use strict";

	log.debug('uploadHeaderImage');

	var conn = mongoose.createConnection(config.mongo.uri);
	var filename;
	var postId;

	var _save = function(post, filename) {
		post.header_image_url = filename;
		post.save(function(err) {
			if(err) {
				res.status(500).send(new ReturnModel(null, err, null));
				return;
			}
			log.debug("header image saved", filename);

			res.status(201).send(new ReturnModel(post, null, null));
		});
	};

	conn.once('open', function() {

		log.debug('mongo conn open');


		var gfs = new Grid(conn.db);


		var form = new multiparty.Form({autoFields: false});

		form.on('field', function(name, value) {
			log.debug("upload field: ", name, value);

			if(name==='postid') {
				postId = value;
			}

		});

		form.on('part', function(part) {
			part.on('error', function(err) {
				log.error('error handling upload part', err);
				res.status(500).send();
			});

			log.debug("upload part retrieved", part.name, part.byteCount, part.headers);
			filename = _createFileName(part.filename);

			var ws = gfs.createWriteStream({
				filename: filename
			});

			part.pipe(ws);


		});

		form.on('close', function() {
			log.debug('uploaded %s', filename);

			PostModel.findOne({_id: postId}, function(err, post) {
				if(err) {
					res.status(500).send(new ReturnModel(null, err, null));
					return;
				}

				if(!post) {
					res.status(404).send(new ReturnModel(null, 'ENOPOST', null));
				}

				if(!!post.header_image_url) {
					_save(post, filename);
					return;
				}

				gfs.exist({filename: post.header_image_url}, function(err, found) {
					if(err) {
						res.status(500).send();
						return;
					}

					if(!!found) {
						log.debug("previous header image exists");

						gfs.remove({filename: post.header_image_url}, function(err) {
							if(err) {
								log.error(err);
								res.status(500).send(new ReturnModel(null, err, null));
								return;
							}

							log.debug("previous header image removed");

							_save(post, filename);

						});
					} else {
						log.debug("previous header image not found");
						_save(post, filename);
					}

					gfs.createReadStream({filename: req.params.filename}).pipe(res);
				});
			});
		});

		form.on('error', function(err) {
			log.error('form error', err);
			res.status(500).send(new ReturnModel(null, err, null));
		});

		form.on('abort', function() {
		});

		form.parse(req);
	});
};

exports.getImage = function(req, res) {
	"use strict";

	var conn = mongoose.createConnection(config.mongo.uri);

	conn.once('open', function() {
		var gfs = new Grid(conn.db);

		gfs.exist({filename: req.params.filename}, function(err, found) {
			if(err) {
				res.status(500).send();
				return;
			}

			if(!found) {
				res.status(404).send();
				return;
			}

			gfs.createReadStream({filename: req.params.filename}).pipe(res);
		});

	})

};


exports.destroy = function() {};