const passport = require('passport')
const JwtStrategy= require('passport-jwt').Strategy
const ExtractJwt= require('passport-jwt').ExtractJwt
const User= require('../model/user')

let opts={
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'shubham'

}

passport.use(new JwtStrategy(opts,(payLoad,done)=>{
    User.findById(payLoad._id).then(user=>{
        if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }
    }).catch(err=>{
        console.log("there is Error with Finding USer",err);
        return;
    })
}));

module.exports=passport;