let userTeam = require('../models/userTeams')
// i dont think its working

exports.post = function(req, res, next){
    console.log("hitting post ", req.body)
    let newUserTeam = new userTeam(req.body)
    newUserTeam.save(function(err, resp){
        if(err) throw err;
        res.status(201).json(resp)
    })

}
exports.get = function(req, res, next){
    console.log("hitting get")
    userTeam.find({}, function(err, resp){
        if(err) throw err;
        res.json(resp)
    })
    // userTeam.find({})
    // .populate('players')
    // .exec(function(err, resp){
    //     if(err) throw err;
    //     res.status(200).json(resp)

    // })
}

exports.delete = function(req, res, next){
    console.log("htiing delete")
    userTeam.deleteMany({})
    .exec(function(err, resp){
        if(err) throw err
        res.status(200).send("deleted all")
    })
}

exports.postTeam = function(req, res, next){
  console.log('is it this one?')
    userTeam.findById(req.params.id, function(err, resp){
        if(err) throw err;
        //go through each player from req.body add it to players and save

        req.body.forEach(element => {
            resp.players.push(element);

        });


        resp.save((err, resp)=>{
            if(err) throw err;
            res.status(201).send("added team to user")
        })
    })
}
