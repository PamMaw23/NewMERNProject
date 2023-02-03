
const express = require('express');
const bodyParser = require('body-parser');
const port = 8000;
const {Server} = require('socket.io');
const cors = require('cors');
require('dotenv').config({path:"hidden.env"});
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const fs = require("fs");
const cookieParser = require('cookie-parser');
const server = require("http").createServer(app);



const io = require("socket.io")(server, {
	cors: {
		origin: "*",
		methods: [ "GET", "POST" ]
	}
});

app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
require("./config/mongoose.config");
require('../server/routes/user.routes')(app);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send('Server is running');
});

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads");
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage: storage });

app.post("/register", upload.single("testImage"), (req, res) => {
	const saveImage = imageModel({
		img: {
			data: fs.readFileSync("uploads/" + req.file.filename),
			contentType: "image/png",
		},
	});
	saveImage
		.save()
		.then((res) => {
			console.log("Image is saved");
		})
		.catch((err) => {
			console.log(err, "error has occur");
		});
	res.send('image is saved')
});

app.get('/register',async (req,res)=>{
	const allData = await imageModel.find()
	res.json(allData)
	})

io.on("connection", (socket) => {
	socket.emit("me", socket.id);

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	});

	socket.on("callUser", ({ userToCall, signalData, from, name }) => {
		io.to(userToCall).emit("callUser", { signal: signalData, from, name });
	});

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	});

    socket.on("send-message", (data)=>{
        socket.broadcast.emit("receive-message", data);
    });
	socket.on("canvas-data", (data)=>{
		socket.broadcast.emit("canvas-data", data);
	})
});

server.listen(port, () => console.log(`Server is running on port ${port}`));