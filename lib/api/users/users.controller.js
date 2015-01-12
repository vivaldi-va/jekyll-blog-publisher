/**
 * Created by vivaldi on 08/01/2015.
 */


var Joi			= require('joi');
var bcrypt		= require('bcrypt');
var jwt			= require('jsonwebtoken');
var log		= require('log4js').getLogger('Controllers.Post');

var config		= require('../../config/env');
var UserModel	= require('./users.model');
var ReturnModel	= require('../../utils/return-model.util');


function _getUserByEmail(email, cb) {
	UserModel.findOne({"email": email}, cb);
}

exports.create = function(req, res) {
	"use strict";

	var schema = Joi.object().keys({
		email: Joi.string().email().required(),
		password: Joi.string().min(8).required(),
		firstname: Joi.string().required(),
		lastname: Joi.string().required()
	});

	Joi.validate(req.body, schema, {abortEarly: false}, function(err, validatedUser) {
		if(err) {
			res.status(400).send(new ReturnModel('EVALIDATION', err, null));
			return;
		}

		var ip = req.headers['X-Forwarded-For'] || req.connection.remoteAddress;

		_getUserByEmail(req.body.email, function(err, hasUser) {

			if(err) {
				log.error("getting user failed", err);
				res.status(500).send(new ReturnModel('ESRV', null, null));
				return;
			}

			if(!!hasUser) {
				res.status(403).send(new ReturnModel(null, null, 'EUSEREXISTS'));
				return;
			}

			bcrypt.genSalt(10, function(err, salt) {
				if(err) {
					log.error("generating salt failed", err);
					res.status(500).send(new ReturnModel('ESRV', null, null));
					return;
				}

				bcrypt.hash(validatedUser.password, salt, function(err, hash) {
					if(err) {
						log.error("generating passhash failed", err);
						res.status(500).send(new ReturnModel('ESRV', null, null));
						return;
					}

					var user = {
						email: validatedUser.email,
						passhash: hash,
						name: {
							first: validatedUser.firstname,
							last: validatedUser.lastname
						},
						attrs: {
							created_ip: ip,
							last_login_ip: ip
						}
					};

					UserModel.create(user, function(err, createdUser) {
						if(err) {
							log.error("generating user failed", err);
							res.status(500).send(new ReturnModel('ESRV', null, null));
							return;
						}

						var token = jwt.sign(createdUser._id, config.auth.jwt.secret);

						res.cookie('mblogedit.token', token, { maxAge: 1000*60*60*24*30 });


						var user = createdUser.toObject();

						delete user.attrs;
						delete user.passhash;

						var result = {
							user: user,
							token: token
						};

						res.status(201).send(new ReturnModel(null, result, null));

					});

				});
			});
		});
	});

};


exports.login = function(req, res) {
	"use strict";

	var schema = Joi.object().keys({
		email: Joi.string().email().required(),
		password: Joi.string().min(8).required()
	});

	Joi.validate(req.body, schema, {abortEarly: false}, function(err, validatedUser) {
		if (err) {
			res.status(400).send(new ReturnModel('EVALIDATION', err, null));
			return;
		}

		var ip = req.headers['X-Forwarded-For'] || req.connection.remoteAddress;

		_getUserByEmail(req.body.email, function (err, hasUser) {

			if (err) {
				log.error("getting user failed", err);
				res.status(500).send(new ReturnModel('ESRV', null, null));
				return;
			}

			if (!hasUser) {
				res.status(404).send(new ReturnModel('ENOUSER', null, null));
				return;
			}

			bcrypt.compare(validatedUser.password, hasUser.passhash, function(err, doesMatch) {

				if(err) {
					log.error("comparing password failed", err);
					res.status(500).send(new ReturnModel('ESRV', null, null));
					return;
				}

				if(!doesMatch) {
					res.status(401).send(new ReturnModel('EBADPASS', null, null));
					return;
				}

				var token = jwt.sign(hasUser._id, config.auth.jwt.secret);

				res.cookie('mblogedit.token', token, { maxAge: 1000*60*60*24*30 });

				hasUser.attrs.last_login_ip = ip;

				hasUser.save(function(err) {
					if(err) {
						log.error("saving user failed");
					}
				});

				var user = hasUser.toObject();

				delete user.attrs;
				delete user.passhash;

				var result = {
					user: user,
					token: token
				};

				res.status(200).send(new ReturnModel(null, result, null));

			});
		});
	});



};



exports.checkSession = function(req, res) {
	"use strict";
	if(req.cookies['mblogedit.token']) {

		jwt.verify(req.cookies['mblogedit.token'], config.auth.jwt.secret, function(err, decoded) {
			if(err) {
				log.error(err, "Session auth validation failed");
				res.status(401).send(new ReturnModel('EBADAUTH', null, null));
				return;
			}

			UserModel.findOne({_id: decoded}, function(err, user) {

				if(err) {
					log.error("Error finding user");
					res.status(500).send(new ReturnModel('ESRV', null, null));
					return;
				}

				if(!user) {
					res.status(401).send(new ReturnModel('EBADAUTH', null, null));
					delete req.cookies['mblogedit.token'];
					return;
				}

				res.status(200).send(new ReturnModel(null, {token: req.cookies['mblogedit.token']}, null));

			});


		});

	} else {
		res.status(401).send(new ReturnModel('ENOAUTH', null, null));
	}
}