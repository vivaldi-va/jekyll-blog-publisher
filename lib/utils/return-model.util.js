/**
 * Created by vivaldi on 08/01/2015.
 */


module.exports = function(error, data, message) {
	this.error		= error || null;
	this.data		= data || {};
	this.message	= message || null;
};