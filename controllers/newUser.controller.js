let newUser = require('../models/newUser.model');

exports.post = (req, res, next)=>{
    console.log('hitting post')
    let userNamequery = {username: req.body.username}
    let userEmailQuery= {email: req.body.email}
    newUser.findOne(userNamequery)
    .exec((err, resp)=>{
        if(resp){
            console.log('user name found')
            res.status(400).send({"error": "username in use"})
        }else{
            newUser.findOne(userEmailQuery)
            .exec((err, resp)=>{
             if(resp){
                console.log('email already in use')
                res.status(400).send({"error":"email already registered"})
             }else{
                let myNewUser= new newUser(req.body);
                myNewUser.save((err, resp)=>{
                    if(err) throw err;
                   console.log('resp ', resp)
                   res.status(200).json(resp)
                    
                })
             }
            })
        }
    })
}

exports.get =(req, res, next)=>{
    newUser.find({}, function(err, resp){
        if(err) throw err;
        res.json(resp)
    })
}

exports.delete =(req, res, next)=>{
    newUser.deleteMany({})
    .exec(function(err, resp){
        res.status(200).send("deleted all")
    })
}