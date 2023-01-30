const express = require('express');
const bodyParser = require('body-parser');
const {Server} = require('socket.io');
const cors = require('cors');

const app = express();
const port = 8000;
const io = new Server({
    cors: true
});

// require('./server/config/mongoose.config');
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({extended:true}))
// require('./server/routes/project.routes')(app);
app.use(bodyParser.json());

const emailToSocketMapping = new Map();
const socketToEmailMapping = new Map();

io.on('connection', (socket)=>{
    console.log("New Connection");
    socket.on("join-room", (data)=>{
        const{roomId, emailId} = data;
        console.log('User', emailId, 'Joined Room', roomId);
        emailToSocketMapping.set(emailId, socket.id);
        socketToEmailMapping.set(socket.id, emailId);
        socket.join(roomId);
        socket.emit('joined-room', {roomId});
        socket.broadcast.to(roomId).emit('user-joined', {emailId});
    });

    socket.on('call-user', data =>{
        const { emailId, offer} = data;
        const fromEmail = socketToEmailMapping.get(socket.id);
        const socketId = emailToSocketMapping.get(emailId);
        socket.to(socketId).emit('incoming-call', { from: fromEmail, offer})
    });

    socket.on('call-accepted', data =>{
        const {emailId, ans} = data;
        const socketId = emailToSocketMapping.get(emailId);
        socket.to(socketId). emit('call-accepted', {ans});
    })
});
    
app.listen(port, () => console.log(`Listening on port: ${port}`) );
io.listen(8001);

//the following line has been replaced in the package.json file with line 7
// "test": "echo \"Error: no test specified\" && exit 1"