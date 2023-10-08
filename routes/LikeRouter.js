const express = require('express')
const likeController= require('../controller/LikeController')
const router=express.Router();
 router.post('/toggle',likeController.toggleLike)

module.exports=router;