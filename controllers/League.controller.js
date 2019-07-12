let League = require('../models/leagues');

exports.get = (req, res, next)=>{
  if(!req.body.etherId){
  League.find({})
  .exec((err,resp)=>{
    if(err) throw err;
    res.status(200).json(resp)
  })
}else{
  let query = {etherId: req.body.etherId}
  League.find(query, (err, resp)=>{
    if(err) throw err;
    res.status(200).json(resp)
  })
}

}

exports.post= (req,res, next)=>{
  let newLeague = new League(req.body);
  newLeague.save((err, resp)=>{
    if(err){ 
      res.status(400).send(err)}
      else{
    res.status(200).send('new League Saved')
      }
  })

}

exports.postUser = (req, res, next)=>{
  console.log('post user to league ')
  let query = {etherId: req.params.LeagueEtherId}
  // console.log('q', query)
  League.findOne(query, (err, resp)=>{
    if(err) {
      res.status(400).send('league not found')
    };
    // console.log('what is in resp', resp)
    resp.users.push(req.body.userId);
    resp.playerCount+=1;
    resp.save((err, resp)=>{
      if(err) throw err;
      res.status(201).send('added user to league')
    })

  })
}

exports.getOne= (req, res, next)=>{
  console.log('hitting get')
  let query = {etherId: req.body.etherId}
  League.find({query}, (err, resp)=>{
    if(err) throw err;
     res.status(200).json(resp);
  })

}

exports.deleteAll= (resq, res, next)=>{
  console.log('hitting delete');
  League.deleteMany({}, (err, resp)=>{
    if(err) throw err;
    res.status(200).send("deleted all leagues")
  })
}

