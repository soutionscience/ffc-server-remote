let User = require('../models/users')
let Player = require('../models/players')


// receives all users (addresses) in a league and.. 

async function calculate (users){// calculate rotal

User.findById(users, (err, resp)=>{
 
  if(err){
    console.log('error finding the user')
  }else{
    console.log('found user ', resp)
    let userPoints  = 0;
    let userPlayers = resp.players;
    console.log('methods test ', userPlayers)
    for (let i= 0; i < userPlayers.length; i++) { // going through the users players
      const element = userPlayers [i];
      // let totalPoints = 0;
      test(element, userPoints).then((resp)=>{
        userPoints= userPoints+ resp;
        console.log('total' , userPoints)

      })
     console.log('so what is the total ', userPoints)
     
      
    
    

      
    }
  }
})

}

async function  getPointsWeek(p){
  let mypoints =0;
   await  Player.findById(p, (err, resp)=>{
    if(err) console.log('error finding player');
   mypoints = resp.pointsWeek;
    console.log('points week ', mypoints)
   
  })
  return mypoints;

 

  }
  async function test(me, userPoints){
    let  points = await getPointsWeek( me);
     userPoints =userPoints + points;
    // console.log('total points ', userPoints)
    return userPoints;
   
  }
module.exports.calculate = calculate;