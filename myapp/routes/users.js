var express = require('express');
var router = express.Router();
let userController = require('../controllers/userController.js')
let loginController = require('../controllers/loginController.js');
let productAddController = require('../controllers/productAddController.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', userController.register)
router.get('/login',loginController.login)
router.get('/product-add',productAddController['product-add'])

module.exports = router;
