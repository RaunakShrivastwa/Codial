const express = require('express');
const homeController = require('../controller/HomeController')
const SignController=require('../controller/SignupController')
const router = express.Router();
console.log("Router Loaded....")
router.get('/', homeController.home)
router.get('/accont', homeController.account)
router.use('/user',require('./UserRoutes'))
router.use('/post',require('./PostRoute'))
router.get('/signup',SignController.Signup);
router.get('/login',SignController.login);
router.use('/comment',require('./commentRoute'))

module.exports = router;