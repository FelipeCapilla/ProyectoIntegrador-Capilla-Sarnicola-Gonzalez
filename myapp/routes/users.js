var express = require('express');
var router = express.Router();
const db = require("../database/models");
let userController = require('../controllers/userController.js')


router.get('/register', userController.register)
router.post('/register', userController.create)

router.get('/login',userController.login)
router.post('/login',userController.storeLogin)

router.post('/logout', userController.logout);

router.get("/profile/:id", userController.profile);

router.get('/change-password', usersController.changePasswordForm);
router.post('/change-password', usersController.changePasswordProcess);

module.exports = router;


