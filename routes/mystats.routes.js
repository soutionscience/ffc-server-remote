var express = require('express');
var router = express.Router();
let controller = require('../controllers/myStart.controller')


router.route('/')
.post(controller.post)
.get(controller.get)

module.exports = router;