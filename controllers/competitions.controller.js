let Compe= require('../models/competitions');
let sortJsonArray = require('sort-json-array');
let User = require('../models/users')

exports.post = (req, res, next)=>{
  console.log('are you posting competitions?')
    let newCompe = new Compe(req.body);
    newCompe.save((err, resp)=>{
        if(err){
            res.status(400).send(err)
        }else{
            res.status(200).send(resp)
        }
    })
}
exports.get = (req, res, next)=>{
    console.log('getting new Competitions')
    // if(!req.body.etherId){
    Compe.find({})
    .populate('teams')
    .exec((err,resp)=>{
      if(err) throw err;
      //console.log('compe ', resp)
      res.status(200).json(resp)
    })
  //}
  // else{
  //   let query = {etherId: req.body.etherId}
  //   Compe.find(query, (err, resp)=>{
  //     if(err) throw err;
  //     res.status(200).json(resp)
  //   })
  // }
}
exports.getOne=(req, res, next)=>{
  let query = {_id: req.params.id}
  console.log('hitting one')
  Compe.findOne(query)
  .populate('teams')
  .exec((err, resp)=>{
    if(!resp){
      res.status(400).send('error geting compe')
    }else{
      // console.log('getting responce ', resp.teams)
     //const newjson = json.parse(res.teams);
      // const jsonAsArray = Object.keys(res).map(function (key) {
      //   return res[key];
      // }).sort
      // console.log('converted to json? ', jsonAsArray)
      res.status(200).json(resp)
    }
  })

}

exports.getTeams=(req, res, next)=>{
  let query = {_id: req.params.compeId}
  console.log('hitting get compe teams ', req.params.compeId)
  Compe.findOne(query)
  .populate('teams')
  .exec((err, resp)=>{
    if(!resp){
      res.status(400).send('error geting compe')
    }else{
   res.status(200).json(sortJsonArray(resp.teams, 'teamPoints', 'des'))
    }
  })

}
exports.deleteAll= (req, res, next)=>{
    console.log('hitting delete');
    Compe.deleteMany({}, (err, resp)=>{
      if(err) throw err;
      res.status(200).send("deleted all leagues")
    })
  }

  exports.postUser=(req, res,next)=>{
    console.log('hitting post user ', req.params.compeId);
    let query = {etherId: req.params.compeId}
    Compe.findOne(query, (err, compe)=>{
      if(err){
        console.log('competitions with id: ', req.params.compeId,   'not found ', );
        res.status(400).send('compe not found')
      }else{
        
        compe.teams.push(req.body.userId)
        compe.playerCount+=1
        compe.save((err, resp)=>{
          if(err){
            console.log('user not added to competitions')
            res.status(400).send('user not added to competition')
          }else{
            console.log('user added to compe!!!');
            User.findById(req.body.userId)
            .exec((err, user)=>{
              if(!user){
                console.log('error finding user for cross posting')
                res.status(400).send({'error':'error finding user for cross posting'})
              }else{
                user.competitions.push(compe._id)
                user.save((err, resp)=>{
                  if(!resp)      res.status(400).send({'error':'saving user after cross posting'})
                  res.status(200).send(resp)
                })
              }
            })
            // res.status(200).send(resp)
          }
        })
      }
    })
    // console.log('q', query)

  }
  exports.postWinner = (req,res, next)=>{
    Compe.findById(req.params.compeId)
    .exec((err, resp)=>{
      if(err){
        console.log('err finding compe')
        res.status(400).send({"err": "error finding compe"})
      }
      else{
        resp.winner=req.body.winner;
        resp.complete= true;
        resp.save((err, resp)=>{
          if(err) res.status(400).send({"error": "error adding winner to compe"});
          res.status(200).json(resp)
        })
      }
    })
  }

  exports.findUserCompetitions= (req, res, next)=>{
    console.log('hitting find user')

  }