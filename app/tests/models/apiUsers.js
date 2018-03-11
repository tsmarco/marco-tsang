var apiUsers = require('../../models/apiUsers.js');
var jwt = require('jsonwebtoken');
var config = require('../../config.js');
var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');

describe('ApiUsers Model', function(){
    var validClientId = "QqTitbH6tzcLrrPx";
  	var validSecret = "ERbvmnFtPjZNtToHjux7VEdh";

    it('It should authenticate on valid login', function() {
      var input = {
                  	"clientId":validClientId,
                  	"secretKey":validSecret
                  }
      var result = apiUsers.authenticateApiUser(input);
      expect(result.authenticated, true)
    });

    it('It should return userId on valid login', function() {
      var input = {
                  	"clientId":validClientId,
                  	"secretKey":validSecret
                  }
      var result = apiUsers.authenticateApiUser(input);
      expect(result.userId, "test2")
    });

    it('It should not authenticate on invalid clientId', function() {
      var input = {
                  	"clientId":"",
                  	"secretKey":validSecret
                  }
      var result = apiUsers.authenticateApiUser(input);
      expect(result.authenticated, false)
      expect(result.userId, "")
    });

    it('It should not authenticate on invalid secretKey', function() {
      var input = {
                  	"clientId":validClientId,
                  	"secretKey":""
                  }
      var result = apiUsers.authenticateApiUser(input);
      expect(result.authenticated, false)
      expect(result.userId, "")
    });

    it('It should not authenticate on invalid secretKey and clientId', function() {
      var input = {
                  	"clientId":"",
                  	"secretKey":""
                  }
      var result = apiUsers.authenticateApiUser(input);
      expect(result.authenticated, false)
      expect(result.userId, "")
    });

});
