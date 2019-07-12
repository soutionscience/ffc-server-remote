let Team = require('../models/teams');

exports.post =(req, res, next)=>{
    console.log("hitting post")
    let newTeam = new Team(req.body);
    newTeam.save(function(err, resp){
        if(err) throw err;
        res.status(201).send('new Team saved')
    })
}

exports.get = (req, res, next)=>{
    //console.log("hitting get")
    //console.log(req.query.name);

    Team.find({})
    .exec(function(err, resp){
        console.log('teams controller')
        if(err) throw err;
        res.status(200).json(resp)

    })
   
}
exports.delete =(req, res, next)=>{
    Team.deleteMany({})
    .exec(function(err, resp){
        res.status(200).send("deleted all")
    })

}