/**
 * Created by vivaldi on 15/01/2015.
 */


var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var InviteSchema = new Schema({
	email: String,
	token: String,
	name: {
		first: String,
		last: String
	},
	permissions: {
		can_publish: {type: Boolean, default: false},
		can_invite: {type: Boolean, default: false}
	}
});

module.exports = mongoose.model('Invite', InviteSchema);