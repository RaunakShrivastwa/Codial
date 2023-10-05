const Comment = require('../model/comment');
const Post = require('../model/post');
const Mailer = require('../Mailer/comment_mailer')
const queue= require('../Config/kue');
const workers= require('../Worker/commentEmail_worker')
module.exports.CreateComment = async (req, res) => {
    try {
        let post = await Post.findById(req.body.post);
        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            post.comments.push(comment);
            post.save();
            comment = await Comment.findById(comment._id)
            .populate('user', 'name email avtar')
            .populate({
              path: 'post',
              populate: {
                path: 'user'
              }
            })
            .exec();
            // Mailer.newComment(comment)
            let job= queue.create('emails',comment).save(function(err){
                 if(err){
                     console.log("there is error with Creating process",err);
                     return;
                 }
                 console.log("Process is ",job.id)
            })
            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: 'comment Created By Ajax'
                })
            }
            return res.redirect('/');
        }
    } catch (err) {
        console.log("there is error ", err);
        return;
    }
}

module.exports.deleteComment = (req, res) => {
    Comment.findById(req.params.id).then(comment => {
        if (comment) {
            let postId = comment.post;
            comment.deleteOne();

            Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } }).then(succ => {
                if (req.xhr) {
                    return res.status(200).json({
                        data: {
                            comment_id: req.params.id
                        },
                        message: 'Comment deleted'
                    })
                }
                req.flash('success', 'Comment Deleted')

                return res.redirect('back');
            })
        }
        else {
            return res.redirect('back');
        }
    })
}