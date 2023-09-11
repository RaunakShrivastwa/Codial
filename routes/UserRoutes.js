const express = require('express')
 const router=express.Router();
 const user=require('../controller/userController')
 const localStratgy= require('../Config/passport-local-strategy')
 const passport = require('passport')

  router.get('/profile/:id',passport.cheakAuthentication,user.profile);
  router.get('/data',user.data)
  router.post('/create',user.CreateUser)
  router.post('/loginUser',passport.authenticate( 'local', {failureRedirect:'/signup'} ),user.SignIn);
  router.get('/signout',user.signout);
  router.post('/update/:id',user.updateUser)

 module.exports=router;