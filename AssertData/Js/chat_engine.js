class ChatEngine{
    constructor(chatBoxId, userEmail){
        // alert("constructor")
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect('http://localhost:5000');

        if (this.userEmail){
            this.connectionHandler();
        }
    }


    connectionHandler(){
        let self= this;
        this.socket.on('connect', function(){
            console.log('connection established using sockets...!');
        });

        self.socket.emit('join_room',{
            user_email: self.userEmail,
            chatroom: 'shubham'   
        })

        self.socket.on('user_joined', function(data){
            console.log("user joined",data)
        })
    }
}