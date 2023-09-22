const User= require('../../../model/user');
const JwtToken= require('jsonwebtoken')

module.exports.USerLogin= async (req,res)=>{
  try{
        let user= await User.findOne({email: req.body.email});
        if(!user || user.password !=req.body.password){
        return res.status(422).json({
            message:'Invalide Cradentials',
        })
        }
        return res.status(200).json({
        Message: "You Login Successfully",
        data:{
         Token: JwtToken.sign(user.toJSON(),'shubham',{expiresIn:1000000})
        }
        
        })
  }catch(err){
   console.log(err)
     return res.status(500).json({
        Message: 'Internal Server Error',
        
     })
  }
}