'use strict';

process.env.MONGO_URI = 'mongodb://localhost/noteapp_test';
require('../../server.js');
var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);

var expect = chai.expect;

describe('notes api end points', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should respond to a post request', function(done) {
    chai.request('localhost:3000/api/v1')
      .post('/notes')
      .send({noteBody: 'test note', author: 'test author'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.have.property('_id');
        expect(res.body.noteBody).to.eql('test note');
        expect(res.body.author).to.eql('test author');
        done();
      });
  });

  it('should have a default author', function(done) {
    chai.request('localhost:3000/api/v1')
      .post('/notes')
      .send({noteBody: 'another test'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.author).to.eql('Anonymous');
        done();
      });
  });


  describe('already has data in database', function() {
    var id;
    beforeEach(function(done){
      chai.request('localhost:3000/api/v1')
        .post('/notes')
        .send({noteBody: 'test note'})
        .end(function(err, res) {
          id = res.body._id;
          done();
        });
    });

    it('should have an index', function(done) {
      chai.request('localhost:3000/api/v1')
        .get('/notes')
        .end(function(err, res){
          expect(err).to.eql(null);
          expect(Array.isArray(res.body)).to.be.true;
          expect(res.body[0]).to.have.property('noteBody');
          done();
        });
    });

    it('should be able to update a note', function(done) {
      chai.request('localhost:3000/api/v1')
        .put('/notes/' + id)
        .send({noteBody: 'new test body'})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.noteBody).to.eql('new test body');
          done();
        });
    });
  });
});
