let express = require('express');
let router = express.Router();
const controller = require('../controllers/newLeague.controller');


router.route('/')
 .get(controller.get)
.post(controller.post)
 .delete(controller.deleteAll)

 router.route('/:etherId')
 .get(controller.getOne)

router.route('/:LeagueEtherId/competitions')
 .post(controller.postCompe)


module.exports = router;
