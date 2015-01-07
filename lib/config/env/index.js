/**
 * Created by vivaldi on 07/01/2015.
 */

'use strict';

var _ = require('lodash');
var path = require('path');

var all = {
	env: process.env.NODE_ENV || 'development',
	root: path.normalize(__dirname + '/../../..'),
	port: process.env.PORT || 3010
};

module.exports = _.merge(
	all,
	require('./' + all.env + '.js')
);