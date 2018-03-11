import { authenticateApiUser } from '../models/apiUsers';
var jwt = require('jsonwebtoken');
var config = require('../config.js');

/*
* Login Controller
* This module is used for logging in to the API. A JWT token is provided on
* successful login for authentication purposes.
*/
export default {
  login: function (req, res) {

    try {
      //Check user against database for matching user.
      var authAttempt =authenticateApiUser(req.body.clientId,
         req.body.secretKey);
      if(authAttempt.authenticated){
          res.json({
              id: authAttempt.userId,
              jwt: jwt.sign({
                  id: authAttempt.userId,
              }, config.JWT_SECRET, { expiresIn: config.JET_EXPIRESIN })
          });
      } else {
          // Return an Unauthorized(401) response if the user could not
          //be authenticated.
          res.status(401).json({
              error: {
                  message: 'Invalid ClientId or secretKey.'
              }
          });
      }
    }
    catch(err) {
      // Return an Internal Server Error(500) response if the authenication
      //process failed.
      res.status(500).json({
          error: {
              message: 'The service has experienced an internal server error. '
               + err
          }
      });
    }

  }
}
