const Comment = require('../model/comment');
const Post = require('../model/post');

module.exports.CreateComment = (req, res) => {
    Post.findById(req.body.post).then(post => {
        if (post) {
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }).then(suc => {
                post.comments.push(suc);
                post.save();
                res.redirect('/');

            }).catch(err => {
                console.log("there is problem with adding Comment", err);
                return;
            })
        }
    }).catch(err => {
        console.log('There is problem with finding post', err);
        return;
    })
}

module.exports.deleteComment=(req,res)=>{
    Comment.findById(req.params.id).then(comment=>{
        if(comment){
            let postId=comment.post;
            comment.deleteOne();

            Post.findByIdAndUpdate(postId,{$pull:{comments: req.params.id}}).then(succ=>{
                return res.redirect('back');
            })
        }
        else{
            return res.redirect('back');
        }
    })
}