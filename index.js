const express= require('express');
const router=require('./routes/RouterMain');
const ejs=require('ejs');
const expressLayout= require('express-ejs-layouts');
const db=require('./Config/DB');
const CookisParser= require('cookie-parser');
const session= require('express-session');
const passport= require('passport');
const PassportLocal= require('./Config/passport-local-strategy');
const passPortJwtStrategy= require('./Config/passport-jwt-strategy')
const MongoStore= require('connect-mongo');
const flashMessage= require('connect-flash');
const flash = require('connect-flash/lib/flash');
const customeFlash= require('./Config/middleWare')
const Google= require('./Config/passport-google-oauth-Strategy')
 // Import the cors package

const Port=8000;
const app=express();

// for chat server
const chatServer = require('http').Server(app);
const chatSockets = require('./Config/chat_socket').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');

app.use(expressLayout);
// extracting the style for the pages
app.use(CookisParser());
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine','ejs');
app.set('views','./views')
app.use(express.static('./AssertData'))
app.use('/upload',express.static(__dirname + '/upload'))

// for the session
app.use(session({
  name: 'Shubham',
  // TODO change the secret before deployment in production mode
  secret: 'blahsomething',
  saveUninitialized: false,
  resave: false,
  cookie: {
      maxAge: (1000 * 60 * 100)
  },
  store: new MongoStore(
      {
      mongoUrl: 'mongodb://127.0.0.1:27017/TodoApp',
      autoRemove: 'disabled'
      },
      function(err){
          console.log(err || 'connect-mongo db setup ok');
      }
  )
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(customeFlash.setFlash);
app.use(
    function(req,res,next){
        if(req.isAuthenticated()){
            res.locals.user=req.user
        }
        next();
    }
)
app.use('/',router);

app.listen(Port,function(err){
    if(err){
        console.log("There is problem with started with server",err);
        return
    }
    console.log("Your Server is running at port ",Port);
})  