/**
 * Created by vivaldi on 13/01/2015.
 */

module.exports = {
	mongo: {
		uri: process.env.MONGOLAB_URI,
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