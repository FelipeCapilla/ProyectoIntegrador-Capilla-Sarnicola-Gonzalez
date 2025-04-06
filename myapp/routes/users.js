var express = require('express');
var router = express.Router();
let userController = require('../controllers/userController.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', userController.register)

module.exports = router;
