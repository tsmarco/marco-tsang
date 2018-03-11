var chai = require('chai');
var app = require('../../server.js');
var expect = chai.expect;
var request = require('supertest');

describe('POST /login', function(){
    it('it should return a token on successful login.', function(done) {
        request(app)
            .post('/login')
            .type('json')
            .send('{"clientId":"QqTitbH6tzcLrrPx","secretKey":"ERbvmnFtPjZNtToHjux7VEdh"}')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body).have.property('jwt');
                done();
        });
    });
    it('it should return 401 status code on failed login.', function(done) {
        request(app)
            .post('/login')
            .type('json')
            .send('{"clientId":"na","secretKey":"na"}')
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
        });
    });

});
