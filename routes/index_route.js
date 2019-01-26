var express = require('express');
var router = express.Router();
var User = require('../models/User');

const IndexController = require('../controllers/IndexController');

router.get('/', function(req, res, next) {
  res.send('<h2>Dummy test app <h2>');
});

router.post('/login',IndexController.login);
router.post('/register',IndexController.register);

module.exports = router;
