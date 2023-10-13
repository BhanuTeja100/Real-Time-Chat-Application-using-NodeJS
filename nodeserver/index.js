// Node server which will handle socket io connections
const io = require('socket.io')(8000)   

const users = {}

// io.on is a socket.io instance which listens many socket connections who enter into the chat
io.on('connection', socket =>{
    // what ever happens with a particular connection that happens through socket.io
    socket.on('new-user-joined', name =>{
        console.log('New user joined', name);
        users[socket.id] = name; // whoever joins give the user a socket.id key which is equal to name

        socket.broadcast.emit('user-joined', name); // Leaving the user who joined the message that the new user joined is broadcasted to all the other users who are in the chat
    });

    // whoever sends the message broadcast to all the other users
    socket.on('send', message => {
        if(message != ""){
            socket.broadcast.emit('receive', {message: message, name: users[socket.id]}); //
        }
    });

    socket.on('disconnect', message => {
        socket.broadcast.emit('left',  users[socket.id]); //
        delete users[socket.id];
    });

    
})