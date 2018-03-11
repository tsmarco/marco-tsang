import { getGroupedAnimals } from '../models/animals';

/*
* Animals Controller
* Controller used for fetching animals.
*/
export default {
  animals: function (req, res) {
    try {
        if(req.id){
          //Get animals array and place it in required response format.
          //ApiUserId is added to the response.
           var response = {
             apiUserId:req.id,
             animals:getGroupedAnimals(req.id)
           }
           res.send(response);
        }else{
          //Return an error if the clientId was not provided.
          res.status(500).json({
                 error: {
                     message: 'Id was not provided to the API. '
                   }
                 });
        }
    }
    catch(err) {
      // Return an Internal Server Error(500) response if the authenication
      // process failed.
       res.status(500).json({
           error: {
               message: 'The service has experienced an internal server error. '
               + err
           }
       });
    }
  }
}
