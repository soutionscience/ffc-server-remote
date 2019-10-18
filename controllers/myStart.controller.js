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
exports.postPotis = (req, res, next)=>{
   
 stat.findOne({})// chck if there is any data
 .exec((err, resp)=>{
    if(err) throw err;
    if(!resp){// no data
     if(req.body.portis){
         let newStat = new stat({"portisStarted": 1})
         newStat.save((err, resp)=>{
             if(err) throw err;
             res.status(200).json(resp)
         })
     }else{
        let newStat = new stat({"getStarted": 1})
        newStat.save((err, resp)=>{
            if(err) throw err;
            res.status(200).json(resp)
        })
     }
    }else{
        if(req.body.portis){
            resp.portisStarted =  resp.portisStarted +1;
            console.log( 'portis added ', resp.portisStarted)
            resp.save((err, resp2)=>{
                if(err) throw err
                res.status(200).json(resp2)
            })

        }else{
            resp.getStarted =  resp.getStarted +1;
            console.log( 'nomal added ',resp.getStarted)
            resp.save((err, resp2)=>{
                if(err) throw err
                res.status(200).json(resp2)
            })
        }
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

exports.delete = (req, res, next)=>{
    stat.deleteMany({})
    .exec((err, resp)=>{
        if(err) throw err;
        res.json({"delete":"deleted all the stat"})
    })
}