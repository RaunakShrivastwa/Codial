const postSchema= require('../model/post');
const comment= require('../model/comment')
module.exports.postDataSave=(req,res)=>{
     const data={
        content:req.body.content,
        user:req.user._id
     };

     postSchema.create(data).then(result=>{
        console.log("post Added successfully!!!");
        return res.redirect('/')
     }).catch(err=>{
        console.log("there is problem with post added",err);
        return;
     })
}

module.exports.deletePost=(req,res)=>{
   postSchema.findById(req.params.id).then(post=>{
      if(post.user == req.user.id){
          post.deleteOne()
         comment.deleteMany({post: req.params.id}).then(data=>{
            return res.redirect('back');
         }).catch(err=>{
            console.log("There is problem with Deleting of post");
            return;
         })
      }
      else{
         return res.redirect('back')
      }
   })
}