const mongoose= require('mongoose');

const friendSchema= new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    friendId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps:true
});

const Friends= mongoose.model('Friends',friendSchema);

module.exports= Friends;