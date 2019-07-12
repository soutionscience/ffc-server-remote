let express = require('express');
let router = express.Router();
const nodemailer = require('nodemailer')


router.post('/', (req, res, next)=>{
    console.log('hitting messages');
    res.status(200).send("works like a charm")
})

module.exports = router