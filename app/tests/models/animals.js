var animals = require('../../models/animals.js');
var jwt = require('jsonwebtoken');
var config = require('../../config.js');
var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');

describe('Animals Model', function(){

    it('It should return no animals on invalid clientId', function() {
      var invalidClientId = "noId";
      var result = animals.getGroupedAnimals(invalidClientId);
      expect(result, [])
    });

    it('It should return animals on valid clientId', function() {
      var validClientId = "test2";
      var result = animals.getGroupedAnimals(validClientId);
      expect(result, [
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
      ]);
    });

});
