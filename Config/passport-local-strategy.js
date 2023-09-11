const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/user')

passport.use(new LocalStrategy({
    usernameField: 'email'
},
    function (email, passport, done) {
        User.findOne({ email: email }).then(user => {
            if (!user || user.password != passport) {
                console.log("Invalide User !!!!!");
                return done(null, false);
            }
            return done(null, user);
        }).catch(err => {
            console.log("There is no user with UserName");
            return done(err);
        });
    }
));


passport.serializeUser(function(user,done){
    return done(null,user.id);
})

passport.deserializeUser(function(id,done){
    User.findById(id).then(result=>{
        return done(null,result);
    }).catch(err=>{
        console.log("Error with finding ---> User");
        return done(err);
    });
});

// cheak the user Authentication
passport.cheakAuthentication= function(req,res,next){
    // if user signed in
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/login');
}

passport.setAunthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user=req.user
    }
}

module.exports=passport;