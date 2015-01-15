/**
 * Created by vivaldi on 08/01/2015.
 */


var request	= require('supertest');
var assert		= require('assert');
var log		= require('log4js').getLogger('test::controllers::posts');
var app		= require('../../server').app;
var util		= require('../../../test/util');
var config		= require('../../config/env');

var testUser = {
	email: "test@email.com",
	password: "password",
	firstname: "john",
	lastname: "dow",
	caninvite: true,
	canpublish: true
};

var token = null;
var inviteToken = null;

describe("Creating users", function() {
	"use strict";

	it("should fail when password is missing", function(done) {
		request(app)
			.post('/api/user/register')
			.send({
				email: testUser.email,
				password: "",
				firstname: testUser.firstname,
				lastname: testUser.lastname
			})
			.expect(400, done);
	});

	it("should fail when email is malformed", function(done) {
		request(app)
			.post('/api/user/register')
			.send({
				email: "anexcellentemail",
				password: testUser.password,
				firstname: testUser.firstname,
				lastname: testUser.lastname
			})
			.expect(400, done);
	});

	it("should fail when name is missing", function(done) {
		request(app)
			.post('/api/user/register')
			.send({
				email: testUser.email,
				password: testUser.password
			})
			.expect(400, done);
	});

	it("should fail when name is missing", function(done) {
		request(app)
			.post('/api/user/register')
			.send(testUser)
			.expect(201)
			.end(function(err, result) {
				if(err) {
					return done(err);
				}

				expect(result.body).to.have.property('data');
				expect(result.body.data).to.have.property('user');
				expect(result.body.data).to.have.property('token');
				expect(result.body.data.user).to.have.property('email');
				expect(result.body.data.user).to.have.property('name');
				expect(result.body.data.user).to.not.have.property('passhash');
				expect(result.body.data.user).to.not.have.property('attrs');

				expect(result.body.data.user.email).to.equal(testUser.email);
				expect(result.body.data.user.name.first).to.equal(testUser.firstname);
				expect(result.body.data.user.name.last).to.equal(testUser.lastname);

				done();
			});
	});
});


describe("logging in", function() {
	"use strict";

	it("should fail when password is missing", function(done) {
		request(app)
			.post('/api/user/login')
			.send({
				email: testUser.email,
				password: ""
			})
			.expect(400, done);
	});

	it("should fail when email is missing", function(done) {
		request(app)
			.post('/api/user/login')
			.send({
				email: testUser.email,
				password: ""
			})
			.expect(400, done);
	});

	it("should fail when password is wrong", function(done) {
		request(app)
			.post('/api/user/login')
			.send({
				email: testUser.email,
				password: "badpassword"
			})
			.expect(401, done);
	});

	it("should fail when email is nonexistant", function(done) {
		request(app)
			.post('/api/user/login')
			.send({
				email: "anexcellent@email.com",
				password: testUser.password
			})
			.expect(404, done);
	});

	it("should work when everything is dandy", function(done) {
		request(app)
			.post('/api/user/login')
			.send({
				email: testUser.email,
				password: testUser.password
			})
			.expect(200)
			.end(function(err, result) {
				if(err) {
					return done(err);
				}

				expect(result.body).to.have.property('data');
				expect(result.body.data).to.have.property('user');
				expect(result.body.data).to.have.property('token');
				expect(result.body.data.user).to.have.property('email');
				expect(result.body.data.user).to.have.property('name');
				expect(result.body.data.user).to.not.have.property('passhash');
				expect(result.body.data.user).to.not.have.property('attrs');

				expect(result.body.data.user.email).to.equal(testUser.email);
				expect(result.body.data.user.name.first).to.equal(testUser.firstname);
				expect(result.body.data.user.name.last).to.equal(testUser.lastname);

				token = result.body.data.token;

				done();
			});
	});

});


describe("Inviting users", function() {
	"use strict";

	var inviteUser = {
		email: "wildtangomedia@gmail.com",
		firstname: "zac",
		lastname: "price",
		canpublish: true,
		caninvite: true
	};

	var inviteUserPass = "suchpassword";

	it("should invite a user", function(done) {
		request(app)
			.post('/api/user/invite')
			.set('Authorization', token)
			.send(inviteUser)
			.expect(201)
			.end(function(err, result) {
				if(err) {
					return done(err);
				}

				expect(result.body).to.be.ok();

				inviteToken = result.body.token;

				done();
			});
	});


	it("should authenticate with the invite token", function(done) {

		request(app)
			.get('/api/user/accept/' + inviteToken)
			.expect(200, done);

	});

	it("should create a user account when accepting the invitation", function(done) {
		request(app)
			.post('/api/user/accept')
			.send({
				password: inviteUserPass,
				token: inviteToken
			})
			.expect(201)
			.end(function(err, result) {
				if(err) {
					console.log(result.body.error);
					return done(err);
				}

				expect(result.body).to.have.property('data');
				expect(result.body.data).to.have.property('user');
				expect(result.body.data).to.have.property('token');
				expect(result.body.data.user).to.have.property('email');
				expect(result.body.data.user).to.have.property('name');
				expect(result.body.data.user).to.not.have.property('passhash');
				expect(result.body.data.user).to.not.have.property('attrs');

				expect(result.body.data.user.email).to.equal(inviteUser.email);
				expect(result.body.data.user.name.first).to.equal(inviteUser.firstname);
				expect(result.body.data.user.name.last).to.equal(inviteUser.lastname);
				expect(result.body.data.user.permissions.can_invite).to.equal(inviteUser.caninvite);
				expect(result.body.data.user.permissions.can_publish).to.equal(inviteUser.canpublish);

				done();
			});
	});

	it("should log into the new account", function(done) {
		request(app)
			.post('/api/user/login')
			.send({
				email: inviteUser.email,
				password: inviteUserPass
			})
			.expect(200)
			.end(function(err, result) {
				if(err) {
					return done(err);
				}

				expect(result.body).to.have.property('data');
				expect(result.body.data).to.have.property('user');
				expect(result.body.data).to.have.property('token');
				expect(result.body.data.user).to.have.property('email');
				expect(result.body.data.user).to.have.property('name');
				expect(result.body.data.user).to.not.have.property('passhash');
				expect(result.body.data.user).to.not.have.property('attrs');

				expect(result.body.data.user.email).to.equal(inviteUser.email);
				expect(result.body.data.user.name.first).to.equal(inviteUser.firstname);
				expect(result.body.data.user.name.last).to.equal(inviteUser.lastname);

				token = result.body.data.token;

				done();
			});
	});

});