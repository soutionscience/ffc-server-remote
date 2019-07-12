let express = require('express');
let router = express.Router();
const controller = require('../controllers/winner.controller.js');


router.route('/:id')
.get(controller.getWinner)



module.exports = router;