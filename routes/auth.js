let  express = require('express');
let router = express.Router();
let User = require('../models/users')
let ethUtil = require( 'ethereumjs-util');
let controller = require('../controllers/auth.controller');
const MetaAuth = require('meta-auth');
const metaAuth = new MetaAuth({
  signature: 'MetaSignature',
  message: 'MetaMessage',
  address: 'MetaAddress',
  banner: 'Example Site Banner'
});
let verify = require('./verify')

let userAddress;

router.get('/:MetaAddress', metaAuth, (req, res) => {
    // Request a message from the server
    userAddress = req.params.MetaAddress

    res.send(req.metaAuth.challenge)
  });

router.get('/:id/:MetaSignature/:nonce', metaAuth, (req, res)=> {
    let token
    let user
    //console.log('hitting 2')
    let publicAddress = req.params.id
    let signature = req.params.MetaSignature
    nonce = req.params.nonce
   
    let query = {address: publicAddress}
    User.findOne(query, (err, user)=>{
      const msg = `I am signing my one-time nonce: ${nonce}`;
      // console.log(msg)
      const msgBuffer = ethUtil.toBuffer(msg);
      const msgHash = ethUtil.hashPersonalMessage(msgBuffer);
      const signatureBuffer = ethUtil.toBuffer(signature);
      const signatureParams = ethUtil.fromRpcSig(signatureBuffer);

      const publicKey = ethUtil.ecrecover(
        msgHash,
        signatureParams.v,
        signatureParams.r,
        signatureParams.s
      );
      const addressBuffer = ethUtil.publicToAddress(publicKey);
      const address = ethUtil.bufferToHex(addressBuffer)
      if (address.toLowerCase() === publicAddress.toLowerCase()) {
       // console.log('verification passed!!')
        token = verify.getToken(user)
        // console.log('token ', token)
        res.status(200).json({
          status: 'Login successful!',
          success: true,
          token: token,
          userName: user.username,
          userId: user._id,
          address: user.address,
          active:user.active,
          email: user.email,
          provider: user.provider
         

        });
      } else {
        //console.log('verification failed')
        return res
          .status(401)
          .send({ error: 'Signature verification failed' });
      }

    })
  

    // The signature verification is successful if the address found with
    // ecrecover matches the initial publicAddress
  


     
});

module.exports= router

