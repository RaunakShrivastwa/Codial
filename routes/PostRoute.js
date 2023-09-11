const express = require('express')
const PostController= require('../controller/PostController')
const router=express.Router();

router.post('/save',PostController.postDataSave);
router.get('/delete/:id',PostController.deletePost);
  
 module.exports=router;