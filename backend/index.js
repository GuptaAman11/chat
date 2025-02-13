const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const { Connection } = require('./db');
const userRoutes = require('./routes/user');
const chatRoute = require('./routes/chat');
const messageRoute = require('./routes/message');
const connectionRoute = require('./routes/connection');
const User = require('./models/User');
const path = require('path');
require("dotenv").config();

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
  });

  socket.on("set_user" , async(userId) => {
    try {
      socket.userId = userId;
      if (!userId) return; // Prevent errors if userId is undefined

      await User.findByIdAndUpdate(userId, {
        $set: { isOnline: true }
      });
      const user = await User.findById(userId);
      console.log(user.isOnline);
    
    } catch (error) {
      console.log(error);
    }
  });

  socket.on('sendMessage', (message) => {
    io.to(message.chatId).emit('receivedMsg', message.message, message.sender , message.name);
  });

  socket.on("disconnect", async () => {
    console.log("disconnected");
    if (!socket.userId) return; // Prevent errors if userId is undefined
    try{
      await User.findByIdAndUpdate(socket.userId, {
        $set: { isOnline: false }
      });
    }catch(error){
      console.log(error);
      
    }
  });
});

// Middlewares
app.use(express.json());

// DB Connection
Connection();

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
