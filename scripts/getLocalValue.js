const request = require('request')
const Player = require('../models/players');
const value = require('../models/values');


exports.getLocal=()=>{
    console.log('getting local')
    request('http://localhost:3000/api/players', (error, response, body)=>{
        if (!error && response.statusCode == 200) {  
        let myresp = JSON.parse(body);
        Player.deleteMany({}) //delete all players
        .exec(function(err, resp){
            if(err) throw err;
            console.log('deleted all players')
        })
        for (let i = 0; i < myresp.length; i++) {
            const element = myresp[i];
            let newPlayer = new Player(element)
            newPlayer.save((err, resp)=>{
                if(err){
                    console.log('error  saving players')
                    throw err;
                }else{

                }
            })
            
        }
        console.log("Added ", myresp.length, " players")
    }
    
    })
}