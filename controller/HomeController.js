const post = require('../model/post')
const User = require('../model/user')
const Comment = require('../model/post')
const Post = require('../model/post')


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

      let user = await User.find({})
      if (req.user) {
         const frnd = await User.findById(req.user._id).populate('friends')
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
}

module.exports.cheak = async (req, res) => {
   try {
      let post = await Post.find({});
      return res.redirect('back');
       console.log("there is error")     
   } catch (err) {
      console.log("There is problem with API", err);
      
   }
}

module.exports.profile = function (req, res) {
   res.render('Profile')
}

module.exports.account = function (req, res) {
   res.render('Account')
}