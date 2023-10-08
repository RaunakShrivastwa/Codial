const express = require('express')
const friendController= require('../controller/friendController')
const router=express.Router();

router.get('/add/:id',friendController.addFriends)


module.exports= router;