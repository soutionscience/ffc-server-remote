let Player = require('../models/players');

exports.post =(req, res, next)=>{
    let newPlayer = new Player(req.body);
    newPlayer.save(function(err, resp){
        if(err) throw err;
        res.status(201).send('new player saved')
    })
}

exports.get = (req, res, next)=>{
       // if team code is provided only return players with that code

       if( req.query.team_code){
           let teamCode =  req.query.team_code
           
           Player.find({team_code : teamCode})
           .exec(function(err, resp){
               if(err) throw err;
               res.status(200).json(resp)
           })
       } else{
    
    Player.find({})
    .exec(function(err, resp){
        if(err) throw err;
        res.status(200).json(resp)

    })}
   
}
exports.delete =(req, res, next)=>{
    Player.deleteMany({})
    .exec(function(err, resp){
        res.status(200).send("deleted all")
    })

}