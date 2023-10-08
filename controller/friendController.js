const User = require('../model/user')
const Friend = require('../model/friends')

module.exports.addFriends = async (req, res) => {
    try {

        const existFriend = await Friend.findOne({
            $or: [
                { user: req.user.id, friendId: req.params.id },
                { user: req.params.id, friendId: req.user._id }
            ]
        });
        if (!existFriend && req.user._id != req.params.id) {
                let frd = await Friend.create({
                    user: req.user._id,
                    friendId: req.params.id
                });

                let user1 = await User.findById(req.user._id);
                let user2 = await User.findById(req.params.id);
                user1.friends.push(req.params.id);
                user1.save();
                user2.friends.push(req.user._id)
                user2.save();

                return res.status(200).json({
                    Message: 'Friend Added',
                    FriendRelation: frd
                })
        }
        else {
            return res.json({
                Message: 'Something went Wrong Friend'
            })
        }



    } catch (err) {
        console.log("There is problem with Creating friend", err);
        return;
    }
}