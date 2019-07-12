let jwt = require('jsonwebtoken');


exports.getToken = (user)=>{
return jwt.sign(user, process.env.secretKey, {
        expiresIn: 360000
    })
   

}

exports.verifyOrdinaryUser = (req, resp, next)=>{
    let token = req.body.token || req.query.token || req.headers['x-access-token']; //check if token is provided

    if(token){
        jwt.verify(token, process.env.secretKey, (err, decoded)=>{
            if(err){
                let err = new Error('You are not authenticated');
               // err.status(401)
                return next(err)
            }else{
                req.decoded = decoded;
                next();
            }

        })

    }else{
        let err = new Error('No token provided');
        // err.status(403);
        return next(err)
    }

}