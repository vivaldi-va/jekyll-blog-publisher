/**
 * Created by vivaldi on 08/01/2015.
 */

'use strict';

var express = require('express');
var controller = require('./users.controller');

var validate	= require('../../utils/validate-req.util');

var router = express.Router();

router.get('/session', controller.checkSession);
router.post('/register', controller.create);
router.post('/login', controller.login);
router.post('/logout', controller.create);
router.post('/invite', validate, controller.createInvite);
router.get('/accept/:token', controller.acceptInviteAuth);
router.post('/accept', controller.acceptInvite);

module.exports = router;