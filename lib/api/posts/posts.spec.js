/**
 * Created by vivaldi on 15/10/2014.
 */

console.log('lib/posts/posts.spec');
var io = require('socket.io-client');
var request	= require('supertest');
var assert		= require('assert');
var log		= require('log4js').getLogger('test::controllers::posts');
var app		= require('../../server').app;
var util		= require('../../../test/util');
var config		= require('../../config/env');

var testPost = {
	"title": "a post",
	"text": "lorum ipsum sitor dolar whatever"
};
var testPost2 = {
	"title": "another post",
	"text": "lorum ipsum sitor dolar whatever"
};

var client1, client2;

var savedPost = null;


describe('Test case: Posts', function() {

	beforeEach(function(done) {
		var clientOpts = {
			'reconnection delay': 0,
			'repoen delay': 0,
			'force new connection': true
		};

		client1 = io.connect('http://localhost:' + config.port, clientOpts);

		client1.on('connect', function() {

			client2 = io.connect('http://localhost:' + config.port, clientOpts);

			client2.on('connect', function() {
				done();
			});
		});
	});

	describe('Create a post', function() {

		it('Should fail if there is no title', function(done) {

			client1.emit('post::create', {title: "", text: testPost.text});

			client1.on('err', function(msg) {
				"use strict";
				expect(msg).to.have.property('error');
				return done();
			});
		});

		it('Should create a post if none exists', function(done) {

			client1.emit('post::create', testPost);

			client1.on('post::create', function(msg) {
				"use strict";
				expect(msg).to.not.have.property('error');
				expect(msg).to.have.property('_id');
				expect(msg.title).to.equal(testPost.title);
				expect(msg.text).to.equal(testPost.text);
				savedPost = msg;
				done();
			});
		});
	});

	describe('Updating a post', function() {
		it('should update an existing post if the _id property exists', function(done) {

			client1.emit('post::save', savedPost);

			client1.on('post::updated', function(msg) {
				"use strict";

				expect(msg).to.have.property('_id');
				done();

			});
		});

		it('should save post edits', function(done) {
			savedPost.text = "something other than the original text";

			client1.emit('post::save', savedPost);

			client1.on('post::updated', function(msg) {
				"use strict";

				expect(msg).to.have.property('_id');
				expect(msg._id).to.equal(savedPost._id);
				expect(msg.text).to.equal(savedPost.text);
				expect(msg.text).to.not.equal(testPost.text);
				done();

			});
		});

	});

	describe('Fetching posts', function() {
		it('Should fetch all posts', function(done) {
			request(app)
				.get('/api/post')
				.expect(200)
				.end(function(err, result) {
					if(err) {
						throw err;
					}

					expect(result.body).to.have.property('data');
					expect(result.body.data).to.not.be.null;
					expect(result.body.data).to.not.be.empty;
					expect(result.body.data).to.have.length(1);
					done();
				});
		});

		it('Should fetch a post by ID', function(done) {
			request(app)
				.get('/api/post/' + savedPost._id)
				.expect(200)
				.end(function(err, result) {
					if(err) {
						throw err;
					}

					expect(result.body).to.have.property('data');
					expect(result.body.data).to.not.be.null;
					expect(result.body.data).to.not.be.empty;
					expect(result.body.data).to.have.property('_id');
					expect(result.body.data._id).to.equal(savedPost._id);
					expect(result.body.data.text).to.equal(savedPost.text);
					expect(result.body.data.title).to.equal(savedPost.title);
					done();
				});
		});

	});


});