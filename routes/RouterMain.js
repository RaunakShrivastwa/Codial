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
router.use('/api', require('./api/API_Route_Main'))
router.use('/likes',require('./LikeRouter'));
router.get("/userHell",homeController.cheak);

module.exports = router;