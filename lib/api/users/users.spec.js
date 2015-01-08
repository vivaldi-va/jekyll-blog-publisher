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
	lastname: "dow"
};

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