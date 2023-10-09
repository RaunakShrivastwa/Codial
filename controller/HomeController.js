const post = require('../model/post')
const User = require('../model/user')
const Comment = require('../model/post')


module.exports.home = async function (req, res) {
   try {   
      let data = await post.find({})
         .sort('-createdAt')
         .populate('user')
         .populate({
            path: 'comments',
            populate: {
               path: 'user'
            }
         })
        
      //   console.log("post data ",data)

        let user= await User.find({})
        if(req.user){
         const frnd= await User.findById(req.user._id).populate('friends')
         return res.render('Home', {
            title: 'Home | Page',
            posts: data,
            users: user,
            frend: frnd
          });
        }
        return res.render('Home', {
          title: 'Home | Page',
          posts: data,
          users: user,
          frend: ""
        });
       



   } catch (err) {
      console.log("There is problem with Home", err);
      return;
   }



   //   let posts= await post.find({})
   //    .populate('user')
   //    .populate({
   //       path:'comments',
   //       populate: {
   //          path:'user'
   //       }
   //    })
   //    .exec().then(data=>{
   //       User.find({}).then(user=>{
   //          return res.render('Home',{
   //             title:'Home | Page',
   //             posts:data,
   //             users:user
   //          });
   //       }).catch(err=>{
   //          console.log("There is problem with LOad user data");
   //          return;
   //       })

   //     }).catch(err=>{
   //        console.log("There  is problem ",err)
   //     })




}

module.exports.profile = function (req, res) {
   res.render('Profile')
}

module.exports.account = function (req, res) {
   res.render('Account')
}