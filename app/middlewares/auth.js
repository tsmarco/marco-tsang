var jwt = require('jsonwebtoken');
var config = require('../config.js');

/*
* Authenication Middleware
* Authenication middleware used to verify tokens from requests.
* This is used to ensure only authenicated users can view restricted pages.
*/
module.exports = function(req, res, next) {
    //Checks if authorization headder is present.
    if( req.hasOwnProperty('headers') &&
    req.headers.hasOwnProperty('authorization') ) {
        try {
            //Verifys the token with the secret. If successful, the clientID
            //is appended to the request.
            req.id = jwt.verify(req.headers['authorization'],
            config.JWT_SECRET).id;
        } catch(err) {
            //Returns error message on failed token verification.
            return res.status(401).json({
                error: {
                    msg: 'Your Token could not be authenticated.'
                }
            });
        }
    } else {
        //Returns error message for missing authorization header.
        return res.status(401).json({
            error: {
                msg: 'Please provide authentication token in authorization header.'
            }
        });
    }
    next();
    return;
};
