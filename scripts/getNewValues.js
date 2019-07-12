const request = require('request')
const Player = require('../models/players');
const value = require('../models/values');

// gets this week's points and player values
exports.getNew = ()=>{
    console.log("get values")
    request('https://fantasy.premierleague.com/drf/bootstrap-static', (error, response, body)=>{
        if(!error && response.statusCode== 200){
            let myresp = JSON.parse(body)
            const element = myresp.elements 
            // player.find({web_name: "Cech"}, (err, resp)=>{
            //     console.log(resp)
            // })
            for (let i= 0; i < element.length; i++) {
               Player.findOne({player_code: element[i].code}, (err, resp)=>{
                   if(err){
                       throw err;
                   }

                   
                if(resp.now_cost){     
               
                   if(resp.now_cost != element[i].now_cost){
                      resp.previous_cost = resp.now_cost;
                       resp.now_cost = element[i].now_cost;
                       resp.change= resp.now_cost -resp.previous_cost
                      
                   }
                   else{
                       if(resp.previous_cost == undefined){
                           resp.previous_cost = element[i].now_cost;
                           
                       }
                   }
                   if(resp.pointsWeek != element[i].event_points){
                       resp.pointsWeek = element[i].event_points
                     }

                     resp.save(function(err, res){
                        if(err) throw err;
                    
                    })

                }
               })
               
                
            }
            console.log("added diff values")
        }

    })
}