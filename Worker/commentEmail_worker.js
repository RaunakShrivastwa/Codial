const queue = require('../Config/kue');
const commentMailer= require('../Mailer/comment_mailer')

queue.process('emails',function(job,done){
    console.log("process running",job.data);

    commentMailer.newComment(job.data);
    done();
})