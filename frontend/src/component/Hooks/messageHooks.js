import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

export function useAddMessage() {
  const addMessage = async (message , chatId) => {
    try {
      const authToken = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/message/addmessage`, {
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

  const fetchMsg = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/message/allmessage/${chatId}`, {
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
    }
  }, [chatId]);
  return { allMsg, setAllMsg };
}
