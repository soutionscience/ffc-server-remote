const request = require('request');
const Player = require('../models/players');
const url = 'https://fantasy.premierleague.com/drf/bootstrap-static';


//checks if players cost have changed and updates


exports.getnew= ()=>{
    console.log("new get")
    request(url, (error, response, body)=>{
        if(!error && response.statusCode== 200){
            let myresp = JSON.parse(body)
            const element = myresp.elements ;
          
            for (let i = 0; i < element.length; i++) {
             Player.findOne({player_code: element[i].code}, (err, resp)=>{
                 //check if now cost has changed
                 if(resp.now_cost){
                     console.log(resp.web_name)
                     console.log(resp.now_cost)

                 }
             })
                
            }

        }

    })

}