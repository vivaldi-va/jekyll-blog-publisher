/**
 * Created by vivaldi on 13/10/2014.
 */


'use strict';

var express = require('express');
var controller = require('./posts.controller');
var validate	= require('../../utils/validate-req.util');

var router = express.Router();

router.get('/', validate, controller.index);
router.get('/:id', validate, controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.get('/image/:filename', controller.getImage);
router.post('/upload', controller.uploadHeaderImage);

module.exports = router;