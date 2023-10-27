const express = require('express')
const router=express.Router();
const User_Api_Controller= require('../../../controller/api/v1/User_api')
router.post('/login/jwt',User_Api_Controller.USerLogin);

module.exports=router;