var express = require('express');
var router = express.Router();
const controller = require('../controllers/players.contoller');



router.route('/')
.get(controller.get)
.post(controller.post)

module.exports = router;
