const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const { Connection } = require('./db');
const userRoutes = require('./routes/user');
const chatRoute = require('./routes/chat');
const messageRoute = require('./routes/message');
const connectionRoute = require('./routes/connection');
const path = require('path');
require("dotenv").config()

const app = express();
const server = http.createServer(app);

// CORS configuration for both HTTP requests and WebSocket
app.use(cors({
  origin: ['http://localhost:3000', 'https://chatapp.guptaaman.tech' , 'http://localhost:3000'], // Allow frontend origin
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow headers
}));
app.use(express.static(path.join(__dirname, 'build')));

// Set up Socket.IO with proper CORS handling
const io = socketIo(server, {
  cors: {
    origin: ['http://localhost:3000', 'https://chatapp.guptaaman.tech' , 'http://localhost:3000'], // Allow frontend origin
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  },
});

io.on("connection", (socket) => {
  console.log("New client connected", socket.id);

  socket.on('join room', (chatId) => {
    socket.join(chatId);
    console.log(`User joined room: ${chatId}`);
  });

  socket.on('sendMessage', (message) => {
    console.log(message);

    io.to(message.chatId).emit('receivedMsg', message.message, message.sender , message.name);
    console.log("message send sucessfully")
  });
});

// Middlewares
app.use(express.json());

// DB Connection
Connection();

// API Routes
app.get("/ping", (req, res)=>{
  // console.log("/ping hitted")
  res.send("PONG");
})

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/message', messageRoute);
app.use('/api/v1/chat', chatRoute);
app.use('/api/v1/connect', connectionRoute);

app.get('*', (req ,res)=>{
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
})
// Start the server
server.listen(8000, () => {
  console.log("Server started on port 8000");
});
