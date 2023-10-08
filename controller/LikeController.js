
const Like = require('../model/like');
const Post = require('../model/post');
const Comment = require('../model/comment');


module.exports.toggleLike = async (req, res) => {
   try {
      let likeable;
      let deleted = false;
      console.log(req.query)
      if (req.query.type == 'Post') {
         likeable = await Post.findById(req.query.id).populate('likes');
      }
      else {
         likeable = await Comment.findById(req.query.id).populate('likes');
      }

      console.log('founded something ', likeable)

      //  cheak like added or not
      let existLike = await Like.findOne({
         likeable: req.query.id,
         onModel: req.query.type,
         user: req.user._id
      })

      console.log("existLike ", existLike)

      //  if like already added delete it
      if (existLike) {
         likeable.likes.pull(existLike._id);
         likeable.save();
         existLike.deleteOne()
         deleted = true;
      } else {
         var like = await Like.create({
            user: req.user._id,
            likeable: req.query.id,
            onModel: req.query.type
         })
         likeable.likes.push(like);
         likeable.save();
         console.log("like now ",like)
      }
        if(req.xhr){
         return res.status(200).json({
            Message:'Like Added!!!!',
            Status: deleted,
            data:{
               Like: like
            }
         })
        }
      return res.redirect('/')

   } catch (err) {
      console.log("There is problem with LikeToggle", err);
      return;
   }
}