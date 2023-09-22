const postSchema= require('../../../model/post');
const comment= require('../../../model/comment');


module.exports.indexData= async(req,res)=>{
    let data= await postSchema.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
       path:'comments',
       populate: {
          path:'user'
       }
    });
    return res.status(200).json(data)
   
}

module.exports.deletePost = async (req, res)=> {
    try {
        let post = await postSchema.findById(req.params.id);
 
        if(post.user == req.user.id) {
            post.deleteOne();
            await comment.deleteMany({post: req.params.id});
 
            return res.status(200).json({
                Message: "deleted Post"
            })
        } 
        else {
            // req.flash('error', 'You cannot delete this post!');
            return res.status(422).json({
                Message: "User Not Matched"
            })
        }
 
    } catch (err) {
        // req.flash('error', err);
        console.log("Error", err);
        return res.status(422).json({
            Message: 'Data Not Deleted'
        })
    }
 }

 