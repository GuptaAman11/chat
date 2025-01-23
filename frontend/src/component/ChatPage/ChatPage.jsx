import React, { useEffect, useRef, useState } from 'react';
import Header2 from '../Header/Header2';
import { useAddMessage, useFetchMsg } from '../Hooks/messageHooks';
import { useGetLoggedInUser } from '../Hooks/chatHooks';
import { useParams } from 'react-router-dom';
import { useSocket } from '../context/SocketContext';

const ChatPage = () => {
  const { chatId } = useParams();
  const { user } = useGetLoggedInUser();
  const { allMsg, setAllMsg } = useFetchMsg();
  const { addMessage } = useAddMessage();
  const [message, setMessage] = useState('');
  const socket = useSocket();
  const chatRef = useRef();

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [allMsg]);

  useEffect(() => {
    if (chatId && socket) {
      socket.emit('join room', chatId);
    } else {
      console.log('no chatId or socket');
    }
    socket.on('receivedMsg', (message, sender , name) => {
      setAllMsg((prevAllMsg) => [
        ...prevAllMsg,
        { content: message, sender: { _id: sender ,name : name } },
      ]);
    });

    return () => {
      socket.off('receivedMsg');
    };
  }, [chatId]);

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    if (user) {
      await addMessage(message, chatId);
      socket.emit('sendMessage', {
        message: message,
        chatId: chatId,
        sender: user._id,
        name : user.name
      });
      setMessage('');
    } else {
      console.log('User not logged in');
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gray-100">
      <Header2 />
      <div className="flex flex-col flex-1 overflow-y-hidden">
        <div>{user?._id}</div>
        <div className="flex flex-col flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {allMsg && allMsg.length > 0 ? (
            allMsg.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg?.sender?._id === user?._id
                    ? 'justify-end'
                    : 'justify-start'
                }`}
                ref={chatRef}
              >
                <div className="flex flex-col items-start">
                  <span className="text-gray-500 text-xs">
                    {msg?.sender?._id === user?._id ? 'you' : msg?.sender?.name}
                  </span>
                  <div
                    className={`flex p-3 rounded-lg max-w-xs break-words gap-3 ${
                      msg?.sender?._id === user?._id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-black'
                    }`}
                  >
                    {msg.content}
                    <span className="text-xs text-black self-center mt-1">
                      {msg?.updatedAt
                        ? new Date(msg.updatedAt).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true,
                          }).replace('am', 'AM').replace('pm', 'PM')
                        : new Date().toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true,
                          }).replace('am', 'AM').replace('pm', 'PM')}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1 className="text-center text-gray-500">No messages available</h1>
          )}
        </div>
        <form
          onSubmit={handleOnSubmit}
          className="flex items-center p-4 bg-white border-t border-gray-300"
        >
          <input
            type="text"
            placeholder={`${user?._id}`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 text-[10px]"
          />
          <button
            type="submit"
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;