var auth = require('../../middlewares/auth.js');
var jwt = require('jsonwebtoken');
var config = require('../../config.js');
var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');

describe('Auth Middleware', function(){
    var request;
    var response;
    var next;
    beforeEach(function() {
        request = {};
        response = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy()
        };
        next = sinon.spy();
    });
    it('It should call next on valid token', function() {
      var token = jwt.sign({ id: "test2" }, config.JWT_SECRET);
        request.headers = {};
        request.headers.authorization = token;
        auth(request, response, next);
        expect(next.calledOnce).to.equal(true);
    });

    it('It should return 401 on invalid token', function() {
        request.headers = {};
        request.headers.authorization = 'null';
        auth(request, response, next);
        expect(response.status.getCall(0).args[0]).to.equal(401);
    });

    it('It should not call next on invalid token', function() {
        request.headers = {};
        request.headers.authorization = 'null';
        auth(request, response, next);
        expect(next.called).to.equal(false);
    });
    it('It should not call next on empty token', function() {
        request.headers = {};
        auth(request, response, next);
        expect(next.called).to.equal(false);
    });
    it('It should return 401 next on empty token', function() {
        request.headers = {};
        auth(request, response, next);
        expect(next.called).to.equal(false);
    });
});
