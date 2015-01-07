/**
 * Created by vivaldi on 07/01/2015.
 */

module.exports = {
	mongo: {
		uri: 'mongodb://localhost/moni',
		options: {
			db: {
				safe: true
			}
		}
	},
	auth: {
		// TODO: use an ssh key file for each auth secret
		jwt: {
			secret: 'secret'
		},
		aes: {
			secret: 'supersecret'
		}
	}
};