/**
 * Created by vivaldi on 24/09/2014.
 */

var mongoose	= require('mongoose');
var Schema	= mongoose.Schema;

var PostSchema = new Schema({
	title: String,
	category: {type: String, default: 'posts'},
	text: String,
	meta: {
		author: {
			_id: Schema.Types.ObjectId,
			name: {
				first: String,
				last: String
			},
			last_contribution: Date
		},
		contributors: [
			{
				_id: Schema.Types.ObjectId,
				name: {
					first: String,
					last: String
				},
				last_contribution: Date
			}
		],
		post_date: {type: Date, default: null}
	},
	attrs: {
		created: {type: Date, default: Date.now},
		modified: {
			timestamp: Date,
			user_id: Schema.Types.ObjectId
		},
		is_draft: {type: Boolean, default: true},
		is_published: {type: Boolean, default: false}
	}
});

module.exports = mongoose.model('Post', PostSchema);