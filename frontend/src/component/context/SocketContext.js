import React, { createContext, useContext, useEffect } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

const socket = io("http://localhost:8000" ,{
}); 
export const SocketProvider = ({ children }) => {
  useEffect(() => {

    console.log("Socket connected");

    return () => {
      console.log("Socket disconnected");
      socket.disconnect(); // Cleanup on unmount if needed
    };
  }, []); 

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
