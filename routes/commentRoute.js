const express = require('express')
const commentController= require('../controller/commentController')
const router=express.Router();

router.post('/save',commentController.CreateComment);
router.get('/delete/:id',commentController.deleteComment);

 module.exports=router;