var express = require('express');
var router = express.Router();
const controller = require('../controllers/teams.controller');
let verify = require('./verify')



router.route('/')
// .all(verify.verifyOrdinaryUser)
.get(controller.get)
.post(controller.post)

module.exports = router;
