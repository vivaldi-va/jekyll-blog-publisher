/**
 * Created by vivaldi on 08/01/2015.
 */

'use strict';

var express = require('express');
var controller = require('./users.controller');

var router = express.Router();

router.post('/register', controller.create);
router.post('/login', controller.login);
router.post('/logout', controller.create);

module.exports = router;