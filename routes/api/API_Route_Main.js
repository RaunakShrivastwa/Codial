const express = require('express')
const router=express.Router();

router.use('/v1',require('./v1/V1_Route'))
module.exports=router;