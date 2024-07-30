const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const { Connection } = require('./db');
const userRoutes = require('./routes/user');
const chatRoute = require('./routes/chat');
const messageRoute = require('./routes/message');

const app = express();


const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  },
});

app.use(express.json());
app.use(cors());

Connection();

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/message', messageRoute);
app.use('/api/v1/chat', chatRoute);

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('self-room', (userData) => {
    socket.join(userData._id);
    console.log(`User ${userData._id} joined room`);
    socket.emit('connected');
  });

  socket.on('join-room', (chatId) => {
    socket.join(chatId);
    console.log(`User joined chat room ${chatId}`);
  });

  socket.on('new-message', (newMessageReceived) => {
    if (!newMessageReceived || !newMessageReceived.chat || !newMessageReceived.chat._id) {
      return console.log('newMessageReceived.chat or chat._id is not found', newMessageReceived);
    }
    const chat = newMessageReceived.chat;
    if (!chat.users) return console.log('chat.users not found');

    chat.users.forEach(user => {
      if (newMessageReceived.sender._id === user._id) return;

      socket.in(user._id).emit('message-received', newMessageReceived);
    });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(8000, () => {
  console.log("Server started on port 8000");
});
