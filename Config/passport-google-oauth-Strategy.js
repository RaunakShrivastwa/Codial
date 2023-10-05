const User = require('../model/user');
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');

passport.use(new GoogleStrategy({
    clientID: '849197842335-bdmpis96skh3v7pdoo1jm2oan4d8d4su.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:8000/user/auth/google/callback'
},

    function (accessToken, refreshToken, profile, done) {
        User.findOne({ email: profile.emails[0].value }).then(user => {          
            if (user) {
                return done(null, user);
            } else {
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex'),
                    avtar:profile.photos[0].value
                    
                    
                }).then(user => {
                    return done(null, user);
                }).catch(err => {
                    console.log("There is problem with Creation User", err);
                    return;
                })
            }
        }).catch(err => {
            console.log("there is problem with finding user in google oauth", err);
            return;
        })
    }
));

module.exports= passport;