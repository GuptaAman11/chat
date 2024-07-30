import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

export function useAddMessage() {
  const { chatId } = useParams();
  const addMessage = async (message) => {
    try {
      const authToken = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/api/v1/message/addmessage', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          content: message,
          chat: chatId
        })
      });
      if (response.ok) {
        return await response.json();
      }
      throw new Error('Failed to add message');
    } catch (error) {
      console.log(error);
    }
  };
  return { addMessage };
}

export function useFetchMsg() {
  const [allMsg, setAllMsg] = useState([]);
  const { chatId } = useParams();
  const authToken = localStorage.getItem('token');
  const socket = io('http://localhost:8000');

  const fetchMsg = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/message/allmessage/${chatId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }

      const responseData = await response.json();
      setAllMsg(responseData);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  useEffect(() => {
    if (chatId) {
      fetchMsg();
      socket.emit('join room', chatId);

      socket.on('message received', (newMessage) => {
        setAllMsg((prevMessages) => [...prevMessages, newMessage]);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [chatId]);

  return { allMsg, setAllMsg };
}
