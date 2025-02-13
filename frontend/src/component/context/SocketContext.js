import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();
const backend_url = "http://localhost:8000";

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [userId, setUserId] = useState(() => localStorage.getItem("userId") || null);
console.log(userId)
    useEffect(() => {
        const newSocket = io(backend_url, {
            transports: ["websocket"],
        });

        setSocket(newSocket); // ✅ Store socket instance
        console.log("Socket connected");

        return () => {
            console.log("Socket disconnected");
            newSocket.disconnect();
            setSocket(null); // ✅ Cleanup
        };
    }, []);

    // Function to update userId
    const updateUserId = (id) => {
        setUserId(id);
        if (socket) {
          console.log("excute socket")
            socket.emit("set_user", id); // ✅ Send user ID to backend
        }
    };

    return (
        <SocketContext.Provider value={{ socket, userId, updateUserId }}>
            {children}
        </SocketContext.Provider>
    );
};

// Custom hook to use the socket context
export const useSocket = () => useContext(SocketContext);
