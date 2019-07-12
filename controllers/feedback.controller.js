let Feedback = require('../models/feedback.model');
let User = require('../models/users');
const request = require('request')


exports.post = (req, res, next)=>{
   let newFeedback = new Feedback(req.body);
    newFeedback.save((err, resp)=>{
        if(err){
            res.status(400).send(err);
        }
        else{
            res.status(200).json(resp)
        }
    })
}
exports.get = (req, res, next)=>{
    Feedback.find({})
    .populate('users')
    .exec((err, resp)=>{
        if(!resp){
            res.status(400).send({"error finding feedback ": err})
        }else{
            res.status(200).json(resp)
        }
    })

}
exports.getOne = (req, res, next)=>{
    console.log('you are hitting post one compe')
    request.post('http://localhost:3000/api/messages', 
        {form:{ mes: "heydude" }},
      (err, resp)=>{
          if(err){
              console.log('error in feedback')
          }
      })
}