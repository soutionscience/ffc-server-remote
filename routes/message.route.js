const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
let aws = require('aws-sdk');



router.post('/', function(req, res, next){
    console.log('hitting messages')
    const userEmail =`${req.body.email}`
    const username = `${req.body.name}`
    const output = `
    <p>Hi ${req.body.name}</p> 
    <p>Thank you for your interest in joining Fantasy coin <br/></p>
    <p>We please check your email in about 24 hrs to confirm if you can participate <br/></p>
        
    <h3>Regards</h3>
    <p>Fantasy Coin</p>
    <p>Dev Team</p>
  `;


    nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'mail.fantasycoiner.com',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: 'info@fantasycoiner.com', // generated ethereal user
                pass: 'Iffcchelski20k*' // generated ethereal password
            },
            tls:{
                rejectUnauthorized: false
            }
        });
        console.log('user email ', userEmail)
        // setup email data with unicode symbols
        let mailOptions = {
            from: '<info@fantasycoiner.com>', // sender address
            to: userEmail, // list of receivers
            subject: 'Welcome ✔', // Subject line
            text: 'Hello world?', // plain text body
            html: output// html body
        };
    
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log('is the error here?',  error);
            }else{
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            res.status(200).json({"msg": "mesage  has been sent"})
        } 
        
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    });
});
module.exports = router;