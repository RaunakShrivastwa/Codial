const Comment= require('../../../model/comment');
const Post = require('../../../model/post')
module.exports.deleteComment = async (req, res) => {
    try {
        let comment = await Comment.findById(req.params.id);
        let postId = comment.post;
        comment.deleteOne();

        let succ = Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } })
        if (req.xhr) {
            return res.status(200).json({
                data: {
                    comment_id: req.params.id
                },
                message: 'Comment deleted'
            })
        }
        return res.status(200).json(comment)
    } catch (err) {
        console.log("Error", err);
        return res.status(500).json({ message: 'Error' })
    }
}