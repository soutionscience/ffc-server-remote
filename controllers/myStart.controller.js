let stat = require('../models/mystats.model');


exports.post = (req, res, next)=>{
  stat.findOne({})
  .exec((err, resp)=>{
      if(err) throw err;
      if(resp.length == 0){
  
           let newStat = new stat({"getStarted": 1});
           newStat.save((err, resp)=>{
               if(err) throw err;
               res.status(200).json(resp)
           })
      }else{
     
          resp.getStarted =  resp.getStarted +1;
          console.log( resp.getStarted)
          resp.save((err, resp2)=>{
              if(err) throw err
              res.status(200).json(resp2)
          })
      }
  })  

}
exports.get = (req, res, next)=>{
    stat.find({})
    .exec((err, resp)=>{
        if(err) throw err;
        res.json(resp);
    })

}