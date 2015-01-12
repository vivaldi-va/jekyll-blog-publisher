/**
 * Created by vivaldi on 09/01/2015.
 */

'use strict';

var jwt				= require('jsonwebtoken');
var config			= require('../config/env');
var ReturnModel	= require('./return-model.util');
var UserModel		= require('../api/users/users.model');
var log			= require('log4js').getLogger('Utils.ValidateRequest');

module.exports = function(req, res, next) {
	log.info("Verifying request authentication");

	// Client must have sent the `Authorization` header in the request
	if(req.header('Authorization')) {

		// Verify the auth header is valid and can be decoded
		jwt.verify(req.header('Authorization'), config.auth.jwt.secret, function(err, decoded) {
			if(err) {
				log.warn({err: err}, "Authentication failed");
				res.status(401).send(new ReturnModel('EBADAUTH', null, null));
				return;
			}

			UserModel.findOne({_id: decoded}, function(err, user) {
				if(err) {
					log.error("Finding user failed", err);
					res.status(500).send(new ReturnModel('ESRV', null, null));
					return;
				}

				if(!user) {
					res.status(401).send(new ReturnModel('ENOUSER', null, null));
					return;
				}

				next();
			});


		});
	} else {
		res.status(401).send(new ReturnModel('ENOAUTH', null, null));
	}
};