var express = require('express');
var router = express.Router();
let controller = require('../controllers/myStart.controller')


router.route('/')
.post(controller.postPotis)
.get(controller.get)
.delete(controller.delete)

module.exports = router;