/**
 * Created by vivaldi on 15/10/2014.
 */

console.log('lib/posts/posts.spec');
var request	= require('supertest');
var assert		= require('assert');
var app		= require('../../server').app;
var util		= require('../../../test/util');

var testPost = {
	"title": "a post",
	"text": "lorum ipsum sitor dolar whatever"

};

var savedPost = null;


describe('Test case: Posts', function() {


	describe('Create a post', function() {
		it('Should create a post if none exists', function(done) {
			request(app)
				.post('/api/post')
				.send(testPost)
				.expect(201)
				.end(function(err, result) {
					if(err) {
						return done(err);
					}

					expect(result.body).to.have.property('data');
					expect(result.body.data).to.have.property('_id');
					expect(result.body.data.title).to.equal(testPost.title);
					expect(result.body.data.text).to.equal(testPost.text);
					savedPost = result.body.data;
					done();
				})
		});
	});

	describe('Updating a post', function() {
		it('should update an existing post if the _id property exists', function(done) {
			request(app)
				.post('/api/post')
				.send(savedPost)
				.expect(200)
				.end(function(err, result) {
					if(err) {
						throw err;
					}

					expect(result.body).to.have.property('data');
					expect(result.body.error).to.be.null;
					expect(result.body.data).to.have.property('_id');
					expect(result.body.data._id).to.equal(savedPost._id);
					expect(result.body.data.title).to.equal(testPost.title);
					expect(result.body.data.text).to.equal(testPost.text);
					done();

				});
		});

		it('should save post edits', function(done) {
			savedPost.text = "something other than the original text";
			request(app)
				.post('/api/post')
				.send(savedPost)
				.expect(200)
				.end(function(err, result) {
					if(err) {
						throw err;
					}

					expect(result.body.data._id).to.equal(savedPost._id);
					expect(result.body.data.text).to.equal(savedPost.text);
					expect(result.body.data.text).to.not.equal(testPost.text);
					done();
				});
		});

	});


});