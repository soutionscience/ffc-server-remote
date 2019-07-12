let League = require('../models/leagues');
let calculateWinner = require('../scripts/winner.script')
let Compe = require('../models/competitions')

// sent a league address by winner router
// finds league and sends all users address found in league to calulateWinner function
exports.getWinner =(req, res, next)=>{
    // let query = {_: req.body.id}
 console.log('params ', req.params.id)
Compe.findById(req.params.id).populate('teams')
    .exec((err, resp)=>{
        if(err){
            console.log('error finding competitions')
            res.status(400).send({"error":"could not find competition"})
        }else{
      console.log('what is in resp ', resp);
     resp.teams.forEach(element => {
                calculateWinner.calculate(element._id);
                  });
                  res.status(200).send({"message":"calculated points"})
        }
        //findWinner(resp.users)
    })

}
function findWinner(users){
for (let i = 0; i < users.length; i++) {
    const element = users[i];
    console.log( 'each element ', element.teamPoints)
    
}
  
}