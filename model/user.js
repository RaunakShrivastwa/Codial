const mongoose = require('mongoose')
const multer= require('multer')
const path= require('path')
const AVATAR_PATH= path.join('/upload/users/avtar')
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    avtar:{
        type: String
    },
    friends:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Friends'
        }
    ]
},{
    timestamps:true
});

// const AVATAR_PATH = 'your_avatar_directory_path';

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now());
    }
});

userSchema.statics.uploadavtar = multer({ storage }).single('avtar');
userSchema.statics.avatarPath = AVATAR_PATH;


const User =mongoose.model('User',userSchema);
module.exports=User;

