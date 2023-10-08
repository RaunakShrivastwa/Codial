const postSchema= require('../model/post');
const comment= require('../model/comment');
const like= require('../model/like')
module.exports.postDataSave=(req,res)=>{
     const data={
        content:req.body.content,
        user:req.user._id
     };

     postSchema.create(data).then(result=>{
        console.log("post Added successfully!!!");
        if(req.xhr){
          return res.status(200).json({
            data: {
               post: result
            },
            message: 'Post Created By Ajax'
          })
        }
       
        return res.redirect('/')
     }).catch(err=>{
        console.log("there is problem with post added",err);
        return;
     })
}

module.exports.deletePost = async (req, res)=> {
   try {
       let post = await postSchema.findById(req.params.id);
       // console.log(post.user);

       if(post.user == req.user.id) {
          
           await like.deleteMany({likeable: post, onModel: 'Post'});
           await like.deleteMany({likeable: {$in: post.comments}});
           post.deleteOne();
           await comment.deleteMany({post: req.params.id});

           if(req.xhr) {
               return res.status(200).json({
                   data: {
                       post_id: req.params.id
                   },
                   message: "Post Deleted!👍"
               })
           }

           req.flash('success', 'Post and associated comments deleted👍!');
           return res.redirect('back');
       } else {
           req.flash('error', 'You cannot delete this post!');
           return res.redirect('back');
       }

   } catch (err) {
       req.flash('error', err);
       console.log("Error", err);
       return;
   }
}