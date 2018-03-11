const fs = require('fs');

/*
* ApiUsers Model.
* This module is used obtaining the apiUsers list from the data source.
* The clientId and secretKey is matched against the user list
* for authentication.
*/
export default {
  authenticateApiUser: function (clientId, secretKey) {
    //Get apiUsers JSON from file
    var contents = fs.readFileSync("./app/resources/apiUsers.json");
    var users = JSON.parse(contents);

    //Find matching user using client ID and secret key
    var result = users.filter(function(x){return x.apiClientId === clientId &&
      x.apiSecretKey === secretKey;} );

    //Get the authenicated user object.
    var user =  result? result[0] : null;
    //Checks if the user is authenticated.
    var authenicated = user != null;
    var userId = authenicated ? user.id : null;
    //returns the authentication result.
    return {"authenticated": authenicated,
            "userId": userId};
  }
}
