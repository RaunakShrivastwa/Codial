module.exports.chatSockets = function(socketServer){
    console.log("config running")
    // let io = require('socket.io')(socketServer);
    let io= require('socket.io')(socketServer,{
        cors: 'http://localhost:5000',
        method: ['POST','GET']
    })
    io.sockets.on('connection', function(socket){
        console.log('new connection received', socket.id);
        socket.on('disconnect', function(){
            console.log('socket disconnected!');
        });

        socket.on('join_room', function(data){
            console.log("joining request room ",data);
            socket.join(data.chatroom)
            io.sockets.in(data.chatroom).emit('user_joined ', data)
        })
    });


}