const express = require('express')
const indexPost= require('../../../controller/api/v1/post_api')
const password= require('passport')
const router=express.Router();
router.get('/',indexPost.indexData);
router.delete('/delete/:id',password.authenticate('jwt',{session: false}),indexPost.deletePost)
module.exports=router;