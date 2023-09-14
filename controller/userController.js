const User = require('../model/user');

module.exports.profile=function(req,res){ 
   User.findById(req.params.id).then(data=>{
      return res.render('Profile',{
         user:req.user,
         userData:data
       })
   })
      
    // if(req.cookies.user_Id){
    //       User.findById(req.cookies.user_Id).then(result=>{
    //         res.render('Profile',{
    //             title:'',
    //             user:result
    //         })
    //       }).catch(err=>{
    //         console.log("There is Error during the finding the user !!!!");
    //         return;
    //       })
    // }else{
    //     return res.render('login',{
    //         title:''
    //     });
    // }
}

module.exports.data=function(req,res){
    res.render('Home',{
        title:'User Information Page'
    })
}


module.exports.CreateUser=(req,res)=>{
   User.findOne({email:req.body.email}).then(res1=>{
      if(!res1){
        User.create(req.body).then(result=>{
        //    return res.send(res1);
            return res.redirect('/login');
        }).catch(err=>{
            console.log("there is problem with Signup of User",err);
            return;
        })
      }
      else {
         res.render('signup',{
            title:'User Already Exist!!!'
         })
      }
   }).catch(err=>{
      console.log("There is problem with finding User",err);
      return;

   })

}



module.exports.SignIn=(req,res)=>{
      req.flash('success','Login Successfully')
  return res.redirect('/');


    // User.findOne({email:req.body.email}).then(result=>{
    //     if(result.password != req.body.password){
    //         console.log("login login")
    //         res.render('login',{
    //             title:'Incorrect Password'
    //         })
    //     }

    //     res.cookie('user_Id',result.id);
    //     res.render('Profile',{
    //         title:'This is User Profile',
    //         user:result
    //     })

    //  }).catch(err=>{
    //     console.log("Invalide Login Crandentioal !!!!!");
    //     return res.render('login',{
    //         title: 'Invalide Login Crandentioal !!!!!'
    //     })
    //  })
}

module.exports.signout=(req,res)=>{
  req.logout((user=>{
     console.log(user)
     req.flash('success','LogOut Successfully')

  }))

  return res.redirect('/');
  
}

module.exports.updateUser=(req,res)=>{
   if(req.user.id==req.params.id){
      User.findByIdAndUpdate(req.params.id,req.body).then(Data=>{
         return res.redirect('back');
      }).catch(err=>{
         console.log("There is problem with Update USer",err);
         return;
      }) 
   }else{
      console.log("error you are doing bad")
      return res.status(401).send("UnAuthorized");
   }
}