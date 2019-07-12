let League = require('../models/newLeague');

exports.get = (req, res, next)=>{
    console.log('getting new Leagues')
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


exports.deleteAll= (req, res, next)=>{
    console.log('hitting delete');
    League.deleteMany({}, (err, resp)=>{
      if(err) throw err;
      res.status(200).send("deleted all leagues")
    })
  }

  exports.postCompe =(req, res, next)=>{
  
    console.log('post competition to league');
    let query = {etherId: req.params.LeagueEtherId};
    League.findOne(query, (err, resp)=>{
      if(err){
        console.log('league not found')
        res.status(400).send('league not found')
      }else{
        resp.competitions.push(req.body.compeId);
        resp.save((err, resp)=>{
          if(err){
            console.log('failed to add competition to league')
            res.status(400).send('failed to add competition to league')

          }else{
            console.log('added competition to league')
            res.status(200).send("successfully added competion to league")

          }
        })
      }
    })

  }

  exports.getOne= (req, res, next)=>{
    // console.log('hitting get ', req.params.etherId)
  let query = {etherId: req.params.etherId}
  // League.find(query, (err, resp)=>{
  //   if(err) throw err;
  //  res.status(200).json(resp);
  // })
  League.findOne(query)
  .populate('competitions')
  .exec((err, resp)=>{
    if(err) throw err;
    res.status(200).json(resp)
  })
  }