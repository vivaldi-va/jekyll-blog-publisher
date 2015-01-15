/**
 * Created by vivaldi on 08/01/2015.
 */


var Joi			= require('joi');
var bcrypt		= require('bcrypt');
var jwt			= require('jsonwebtoken');
var crypto		= require('crypto');
var mailer		= require('nodemailer');


var log		= require('log4js').getLogger('Controllers.Post');

var config		= require('../../config/env');
var UserModel	= require('./users.model');
var InviteModel = require('../invites/invites.model');
var ReturnModel	= require('../../utils/return-model.util');


function _getUserByEmail(email, cb) {
	UserModel.findOne({"email": email}, cb);
}


function _genTokenById(userId) {
	"use strict";
	return jwt.sign(userId, config.auth.jwt.secret);
}

exports.create = function(req, res) {
	"use strict";

	var schema = Joi.object().keys({
		email: Joi.string().email().required(),
		password: Joi.string().min(8).required(),
		firstname: Joi.string().required(),
		lastname: Joi.string().required(),
		caninvite: Joi.boolean(),
		canpublish: Joi.boolean()
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
						},
						permissions: {
							can_invite: validatedUser.caninvite,
							can_publish: validatedUser.canpublish
						}
					};

					UserModel.create(user, function(err, createdUser) {
						if(err) {
							log.error("generating user failed", err);
							res.status(500).send(new ReturnModel('ESRV', null, null));
							return;
						}

						var token = _genTokenById(createdUser._id);

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

				var token = _genTokenById(hasUser._id);

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

				user = user.toObject();

				delete user.attrs;
				delete user.passhash;

				res.status(200).send(new ReturnModel(null, {token: req.cookies['mblogedit.token'], user: user}, null));

			});


		});

	} else {
		res.status(401).send(new ReturnModel('ENOAUTH', null, null));
	}
};


exports.createInvite = function(req, res) {
	"use strict";

	var schema = Joi.object().keys({
		email: Joi.string().email().required(),
		firstname: Joi.string().required(),
		lastname: Joi.string().required(),
		canpublish: Joi.boolean(),
		caninvite: Joi.boolean()
	});


	var userId = jwt.decode(req.header('Authorization'));


	UserModel.findOne({_id: userId}, function(err, user) {
		if(err) {
			res.status(500).send(new ReturnModel('ESRV', null, null));
			return;
		}

		if(!user.permissions.can_invite) {
			log.warn("User does not have permissions to invite");
			res.status(403).send(new ReturnModel('ENOPERMISSIONS', null, null));
			return;
		}

		Joi.validate(req.body, schema, {abortEarly: false}, function(err, validated) {
			if(err) {
				res.status(400).send(new ReturnModel('EVALIDATION', err, null));
				return;
			}

			UserModel.findOne({email: validated.email}, function(err, result) {
				if(err) {
					res.status(500).send(new ReturnModel('ESRV', null, null));
					return;
				}

				if(!!result) {
					res.status(403).send(new ReturnModel('EUSEREXISTS', null, null));
					return;
				}


				var transport = mailer.createTransport();
				var token = crypto.createHash('md5').update(new Date().getTime() + validated.email).digest("hex");

				var transportOptions = {
					from: 'blogeditor@monitechnologies.com',
					to: validated.email,
					subject: "You've been invited to the Moni blog publisher",
					html: "<p>To create your account, follow the link provided and enter your details <br/></p>" +
					"<a href=\"http://moniblogeditor.herokuapp.com/" + token + "\">moniblogeditor.herokuapp.com/" + token + "</a>"
				};



				InviteModel.create({
					email: validated.email,
					name: {
						first: validated.firstname,
						last: validated.lastname
					},
					permissions: {
						can_publish: validated.canpublish,
						can_invite: validated.caninvite
					},
					token: token
				}, function(err) {

					if(err) {
						return res.status(500).send(new ReturnModel('ESRV', null, null));
					}


					transport.sendMail(transportOptions, function(err, info) {
						if(err) {
							log.error("Error sending mail", err);
							return;
						}

						log.info("Sent invitation email to " + validated.email, info);
					});

					res.status(201).send({token: token});

				});
			})

		});


	});



};


exports.acceptInviteAuth = function(req, res) {
	"use strict";

	//log.debug(req.params);

	if(!req.params.token) {
		res.status(403).send(new ReturnModel('EBADTOKEN'));
		return;
	}


	InviteModel.findOne({token: req.params.token}, function(err, result) {
		if(err) {
			return res.status(500).send(new ReturnModel('ESRV', null, null));
		}

		if(!result) {
			res.status(403).send(new ReturnModel('EBADTOKEN'));
			return;
		}

		res.status(200).send();


	});
};


exports.acceptInvite = function(req, res) {
	"use strict";

	var schema = Joi.object().keys({
		password: Joi.string().min(6).required(),
		token: Joi.string().required()
	});

	Joi.validate(req.body, schema, {abortEarly: false}, function(err, validatedUser) {
		if(err) {
			res.status(400).send(new ReturnModel('EVALIDATION', err, null));
			return;
		}

		InviteModel.findOne({token: req.body.token}, function(err, result) {
			if(err) {
				return res.status(500).send(new ReturnModel('ESRV', null, null));
			}

			if(!result) {
				res.status(403).send(new ReturnModel('EBADTOKEN'));
				return;
			}

			//log.debug("Date from user invite", result);

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


					var ip = req.headers['X-Forwarded-For'] || req.connection.remoteAddress;

					var user = {
						email: result.email,
						passhash: hash,
						name: {
							first: result.name.first,
							last: result.name.last
						},
						attrs: {
							created_ip: ip,
							last_login_ip: ip
						},
						permissions: {
							can_publish: result.permissions.can_publish,
							can_invite: result.permissions.can_invite
						}
					};

					UserModel.create(user, function(err, createdUser) {
						if(err) {
							log.error("generating user failed", err);
							res.status(500).send(new ReturnModel('ESRV', null, null));
							return;
						}

						var token = _genTokenById(createdUser._id);

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

}