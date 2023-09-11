module.exports.Signup=(req,res)=>{
    if(req.isAuthenticated() ){
        
        return res.redirect('/user/profile')
    }
    res.render('Signup',{       
        title:''
    })
}

module.exports.login=(req,res)=>{
    res.render('login',{
        title:''
    })
}