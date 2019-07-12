const MetaAuth = require('meta-auth');
const metaAuth = new MetaAuth({
  signature: 'MetaSignature',
  message: 'MetaMessage',
  address: 'MetaAddress',
  banner: 'Example Site Banner',
  challenge: 'please read this'
});

  
// exports.get = ( (req, res, next)=>{
 
//     console.log('hitting auth')
//     console.log('what is', metaAuth.challenge)
//      res.send({"challenge":metaAuth.challenge})

//   })

//  exports.get('/auth/:MetaMessage/:MetaSignature', metaAuth, (req, res) => {
//     if (req.metaAuth.recovered) {
//       // Signature matches the cache address/challenge
//       // Authentication is valid, assign JWT, etc.
//       res.send(req.metaAuth.recovered);
//     } else {
//       // Sig did not match, invalid authentication
//       res.status(500).send();
//     };
//   });