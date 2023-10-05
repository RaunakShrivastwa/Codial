const nodemailer= require('../Config/nodeMailer')

exports.newComment= (Comment)=>{
    let htmlString= nodemailer.renderTemplate({Comment:Comment},'/comment/new_comment.ejs')
    console.log(Comment)

    nodemailer.transport.sendMail({
        from:'codecprogramming@gmail.com',
        to: Comment.user.email,
        subject: 'new Comment Published',
        html:htmlString
    },
    (err,info)=>{
        if(err){
            console.log("there is error with sending mail",err);
            return;
        }
        // console.log("message send !!!",info);
        return;
    }
    )
}
