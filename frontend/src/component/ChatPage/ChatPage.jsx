import React, { useEffect, useState } from 'react';
import './ChatPage.css';
import Header2 from '../Header/Header2';
import { useAddMessage, useFetchMsg } from '../Hooks/messageHooks';
import io from 'socket.io-client';
import { useGetLoggedInUser } from '../Hooks/chatHooks';
import { useParams } from 'react-router-dom';

const ChatPage = () => {
  const { chatId } = useParams();
  const { user } = useGetLoggedInUser();
  const { allMsg, setAllMsg } = useFetchMsg();
  const { addMessage } = useAddMessage();
  const [socketConnected, setSocketConnected] = useState(false);
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:8000');
    setSocket(newSocket);

    if (user) {
      newSocket.emit('self-room', user);
      newSocket.on('connection', () => {
        setSocketConnected(true);
        console.log('Socket connected');
      });
    }

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    if (socket && chatId) {
      socket.emit('join-room', chatId);
    }
  }, [socket, chatId]);

  useEffect(() => {
    if (socket) {
      socket.on('message-received', (newMessageReceived) => {
        if (chatId !== newMessageReceived.chat._id) {
          // give notification
        } else {
          setAllMsg((prevAllMsg) => [...prevAllMsg, newMessageReceived]);
        }
      });
    }

    return () => {
      if (socket) {
        socket.off('message received');
      }
    };
  }, [socket, chatId, setAllMsg]);

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    if (user) {
      const newMessage = await addMessage(message);
      socket.emit('new-message', newMessage);
      setAllMsg((prevAllMsg) => [...prevAllMsg, { content: message, user: user._id }]);
      setMessage('');
    } else {
      console.log('User not logged in');
    }
  };

  return (
    <div className="chat-page">
      <Header2 />
      <div className="chat">
        {allMsg && allMsg.length > 0 ? (
          allMsg.map((msg, index) => (
            <div key={index} className="chat-messages">
              <div className="message">{msg.content}</div>
            </div>
          ))
        ) : (
          <h1>No messages available</h1>
        )}
        <form onSubmit={handleOnSubmit}>
          <input 
            type="text" 
            placeholder="Type a message..." 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
