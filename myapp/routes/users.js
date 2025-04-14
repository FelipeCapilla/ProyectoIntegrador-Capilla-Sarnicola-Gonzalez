var express = require('express');
var router = express.Router();
let userController = require('../controllers/userController.js')
let loginController = require('../controllers/indexController.js');
let productAddController = require('../controllers/productController.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', userController.register)
router.get('/login',userController.login)
router.get('/product-add',productAddController.productAdd)

module.exports = router;
