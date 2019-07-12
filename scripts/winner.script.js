let User = require('../models/users')
let Player = require('../models/players')


// receives all users (addresses) in a league and.. 

function calculate (users){// calculate rotal
  console.log('passed users ', users)
let pointsTotal=0;
User.findById(users).populate('players')
.exec(function(err, user){
  let players = user.players;
  players.forEach(element => {
   pointsTotal = pointsTotal + element.pointsWeek;
    
  });
  console.log('users points total ', pointsTotal)
  user.teamPoints = pointsTotal
  user.save(function(err, resp){
    if (err) console.log('error updating user score')
    console.log('user points updated')
  })
})
// return true

}

// async function  getPointsWeek(p){
//   let mypoints =0;
//    await  Player.findById(p, (err, resp)=>{
//     if(err) console.log('error finding player');
//    mypoints = resp.pointsWeek;
//     console.log('points week ', mypoints)
   
//   })
//   return mypoints;

 

//   }
//   async function test(me, userPoints){
//     let  points = await getPointsWeek( me);
//      userPoints =userPoints + points;
//     // console.log('total points ', userPoints)
//     return userPoints;
   
//   }
module.exports.calculate = calculate;