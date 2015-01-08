/**
 * Created by vivaldi on 08/01/2015.
 */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	email: String,
	passhash: String,
	name: {
		first: String,
		last: String
	},
	permissions: {
		can_publish: {type: Boolean, default: false}
	},
	attrs: {
		created_at: {type: Date, default: Date.now},
		created_ip: String,
		last_login_ip: String
	}
});

module.exports = mongoose.model('User', UserSchema);