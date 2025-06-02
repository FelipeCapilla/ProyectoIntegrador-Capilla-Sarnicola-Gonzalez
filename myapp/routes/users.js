var express = require('express');
var router = express.Router();
const db = require("../database/models");
let userController = require('../controllers/userController.js')
const { body } = require("express-validator");



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', userController.register)
router.post('/register', userController.create)
router.get('/login',userController.login)
router.post('/login',userController.ingreso)
router.get('/profile', userController.profile)
router.get('/logout', profileController.logout);


module.exports = router;
