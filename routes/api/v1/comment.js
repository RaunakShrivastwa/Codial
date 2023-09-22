const Comment_API_Controller= require('../../../controller/api/v1/comment_api')
const express = require('express')
const router=express.Router();
router.delete('/delete/:id',Comment_API_Controller.deleteComment)
module.exports=router;