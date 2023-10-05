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
        const token= JwtToken.sign(user.toJSON(),'shubham',{expiresIn:1000000});
        return res.status(200).json({
        Message: "You Login Successfully",
        data:{
         Token: token
        }
        
        })
  }catch(err){
   console.log(err)
     return res.status(500).json({
        Message: 'Internal Server Error',
        
     })
  }
}



// const User = require('../../../model/user');
// const JwtToken = require('jsonwebtoken');

// module.exports.UserLogin = async (req, res) => {
//   try {
//     let user = await User.findOne({ email: req.body.email });
//     if (!user || user.password != req.body.password) {
//       return res.status(422).json({
//         message: 'Invalid Credentials',
//       });
//     }

//     // Generate the JWT token
//     const token = JwtToken.sign(user.toJSON(), 'shubham', { expiresIn: 1000000 });

//     // Send a Postman request to update the global variable
    // pm.sendRequest({
    //   url: 'https://api.getpostman.com/environments/YOUR_ENVIRONMENT_ID',
    //   method: 'PUT',
    //   header: [
    //     { key: 'Content-Type', value: 'application/json' },
    //     { key: 'X-Api-Key', value: 'YOUR_POSTMAN_API_KEY' },
    //   ],
    //   body: {
    //     mode: 'raw',
    //     raw: JSON.stringify({
    //       environment: {
    //         values: [
    //           {
    //             key: 'JWTToken',
    //             value: token,
    //           },
    //         ],
    //       },
    //     }),
    //   },
    // });

//     return res.status(200).json({
//       Message: 'You Login Successfully',
//       data: {
//         Token: token,
//       },
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({
//       Message: 'Internal Server Error',
//     });
//   }
// };







