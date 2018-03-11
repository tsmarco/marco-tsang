var chai = require('chai');
var app = require('../../server.js');
var expect = chai.expect;
var request = require('supertest');
var jwt = require('jsonwebtoken');
var config = require('../../config.js');

describe('POST /login', function(){
    it('It should return 200 status code on valid token', function(done) {
        request(app)
            .post('/api/animals')
            .type('json')
            .set('Authorization', jwt.sign({ id: 'test2' }, config.JWT_SECRET))
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                done();
        });
    });
    it('It should return 401 status code on invalid token', function(done) {
        request(app)
            .post('/api/animals')
            .type('json')
            .set('Authorization', jwt.sign({ id: 'test2' }, config.JWT_SECRET))
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
        });
    });
    it('it should return apiUserId', function(done) {
        request(app)
            .post('/api/animals')
            .type('json')
            .set('Authorization', jwt.sign({ id: 'test2' }, config.JWT_SECRET))
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body).have.property('apiUserId');
                assert(response.body.apiUserId, 'test2')
                done();
        });
    });
    it('it should return animals', function(done) {
        request(app)
            .post('/api/animals')
            .type('json')
            .set('Authorization', jwt.sign({ id: 'test2' }, config.JWT_SECRET))
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body).have.property('animals');
                assert(response.body.animals, {
                            "apiUserId": "test2",
                            "animals": [
                                {
                                    "type": "dog",
                                    "names": [
                                        "Conor",
                                        "Harry",
                                        "Oliver"
                                    ]
                                },
                                {
                                    "type": "cat",
                                    "names": [
                                        "Simba",
                                        "Milo"
                                    ]
                                }
                            ]
                        });
                done();
        });
    });
});
