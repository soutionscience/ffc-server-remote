var express = require('express');
var router = express.Router();
let controller = require('../controllers/users.controller');
let verify = require('./verify')

/* GET users listing. */
router.route('/')
.get(controller.get)
.delete(controller.delete)
.post(controller.post)

// register new user
router.route('/register')
.post(controller.post)

router.route('/login')
.post(controller.login)

//get user info
router.route('/:id')
.get(controller.getUser)

router.route('/:id/players')
.post(controller.postTeam)
.get(controller.getUserPlayers)

router.route('/:id/coins')
.post(controller.awardCoins)



module.exports = router;
