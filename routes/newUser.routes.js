var express = require('express');
var router = express.Router();
let controller = require('../controllers/newUser.controller');

router.route('/')
.post(controller.post)
.get(controller.get)
.delete(controller.delete)


module.exports = router;
