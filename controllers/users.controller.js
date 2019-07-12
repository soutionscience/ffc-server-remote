const User = require ('../models/users');
const passport = require('passport');
// const verify = require('./verify')

let LocalStrategy = require('passport-local').Strategy
var local= passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// this controller registers new users, display users and post user's team to server


exports.post =(req, res, next)=>{
  console.log('hitting user post');
 let newUser= new User(req.body)
 newUser.save((err, resp)=>{
     if(err) throw err;
     setTimeout((function() {res.status(200).json(resp)}), 2000);
     
 })

  
}

exports.login = (req, res, next)=>{
    passport.authenticate('local', function(err, user, info){
        if(err){return next(err)}
        if(!user){return res.status(401).json({err:info})}
        req.logIn(user,function(err, mine ){
            if(err){console.log(err)
                return res.status(500).json({
                    err: 'Could not log in user',
                    mine: user
                })
            }
            var token = verify.getToken(user)
             res.status(200).json({
                 status: 'Login successfull!',
                 success: true,
                 token:token
             })
        })
    })(req, res, next)

}

exports.get = (req, res, next)=>{
    User.find({}, function(err, resp){
        if(err) throw err;
        res.json(resp)
    })

    // User.find({})
    // .populate('players')
    // .exec(function(err, resp){
    //     if(err) throw err;
    //     res.status(200).json(resp)

    // })

}
exports.delete =(req, res, next)=>{
    User.deleteMany({})
    .exec(function(err, resp){
        res.status(200).send("deleted all")
    })

}

exports.postTeam = (req, res, next)=>{
    console.log('is it this two?')
   User.findById(req.params.id, function(err, resp){
       console.log('player id' ,req.params.id)
        if(err) {
            console.log('error finding user' ,err);
            res.send({ error: 'Signature verification failed' });
        }else{
            if(resp.players){
                resp.players.length =0;
            }
        let newplayerValue=0;
            req.body.forEach(element => {
                        resp.players.push(element);
                        console.log('player value ', element.now_cost)
                        newplayerValue+=element.now_cost;
                        console.log('newplayer value ',newplayerValue)
            
                    });
                    console.log('to be saved ', newplayerValue);
                    if(resp.teamValue>=0){
                        resp.oldTeamValue = resp.teamValue;
                        resp.teamValue = newplayerValue;
                    }else{
                        resp.teamValue = newplayerValue;
                    }
                    resp.save((err, resp)=>{
                        if(err) throw err;
                        res.status(201).json(resp)
                    })
            
        }
      
        
 
    })
}
exports.awardCoins= (req, res, next)=>{
    console.log('award coins ')
    let myAddress = req.params.id
    let query = {address: req.params.id}
    User.findById(req.params.id)
    .exec((err, resp)=>{
        if(!resp){
            console.log('error finding user')
            res.status(400).send({"error":"could not find user"})

        }else{
         resp.balance = req.body.amount;
         resp.active = true;
         console.log('changed balance to ', resp.balance)
         resp.save((err, resp)=>{
             if(err) resp.status(500).send({"error": 'could not save user with new balance'})
             res.status(200).json(resp)
         })
        }
    })
}

exports.getUser = (req, res, next)=>{
    console.log('get single user reached', req.params.id);
    let myAddress = req.params.id
    let query = {address: req.params.id}
    User.findOne(query)
    .populate('players')
    .exec((err, resp)=>{
        if(!resp){
            console.log('error finding user')
            res.status(400).send({"error":"could not find user"})
        }else{
            console.log('user found ')
            res.status(200).json(resp)
        }
    })

}

exports.getUserPlayers= (req, res, next)=>{
    console.log('get single user reached', req.params.id);
    let myAddress = req.params.id
    let query = {address: req.params.id}
    User.findOne(query)
    .populate('players')
    .exec((err, resp)=>{
        if(!resp){
            console.log('error finding user')
            res.status(400).send({"error":"could not find user"})
        }else{
            console.log('user found ')
            res.status(200).json(resp.players)
        }
    })

}
