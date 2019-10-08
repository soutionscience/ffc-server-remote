const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
let aws = require('aws-sdk');

var sesTransport = require('nodemailer-ses-transport');
var smtpPassword = require('aws-smtp-credentials');

// mail setup

 
 



  router.post('/', (req, res, next)=>{

    // setup
    const userEmail =`${req.body.email}`
    const username = `${req.body.name}`
    const output = `
    <p>Hi ${req.body.name}</p> 
    <p>Thank you for your interest in joining Fantasy coin <br/></p>
    <p>We please check your email in 24-48 hrs to confirm if you can participate <br/></p>
        
    <h3>Regards</h3>
    <p>Fantasy Coin</p>
    <p>Dev Team</p>
  `;
    var mailOptions = {
      from: '<info@fantasycoiner.com>',
      to: userEmail,
      html: output
    };

    mailOptions.subject = 'Welcome ✔';


    var sesTransporter = nodemailer.createTransport(sesTransport({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION
      }));
      sesTransporter.sendMail(mailOptions, (error, info)=> {
        if (error) {
          console.log(error);
          res.status(400).send(error)
        } else {
          console.log('Message sent: ' + info.response);
          res.status(200).json({"msg": "mesage  has been sent"})
        }
      });
    
//     mailOptions.subject = 'Nodemailer SMTP transporter';
// var smtpTransporter = nodemailer.createTransport({
//   port: 465,
//   host: 'email-smtp.us-east-1.amazonaws.com',
//   secure: true,
//   auth: {
//     user: process.env.AWS_ACCESS_KEY_ID,
//     pass: smtpPassword(process.env.AWS_SECRET_ACCESS_KEY),
//   },
//   debug: true
// });
// smtpTransporter.sendMail(mailOptions, callback);


  })


  module.exports = router;