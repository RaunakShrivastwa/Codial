const express = require('express')
const router=express.Router();
router.use('/post',require('./posts'))
router.use('/comment',require('./comment'))
router.use('/user',require('./User'))
module.exports=router;