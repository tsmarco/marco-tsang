  const fs = require('fs');

  /*
  * Animals Model.
  * This module is used obtaining the animal list from the data source.
  * Filtering against clientId and grouping against animal types is done to
  * provide the required reponse schema.
  */
  export default {
      getGroupedAnimals: function (clientId) {
        //Get apiUsers JSON from file
        var contents = fs.readFileSync("./app/resources/animals.json");
        var animals = JSON.parse(contents);

        //Filter animals by what the user is allowed to view.
        var animalsFiltered = animals.filter(function(x){return x.apiUserId === clientId});

        //Group animals by type.
        var animalsGrouped = animalsFiltered.reduce(function (obj, item) {
            obj[item.type] = obj[item.type] || [];
            obj[item.type].push(item.name);
            return obj;
        }, {});

        //Map animals by correct format.
        var result = Object.keys(animalsGrouped).map(function (key) {
            return {type: key, names: animalsGrouped[key]};
        });
        console.log(result);
        return result;
      }
  }
