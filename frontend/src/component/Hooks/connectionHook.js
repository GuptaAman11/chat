import { useState } from 'react';
export function useConnectionHook() {
    const [connections, setConnections] = useState([]);
    const getConnections = async () => {
        try{
            const auth = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_API_URL}/connect/abc`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${auth}`,
                    'Content-Type': 'application/json',
        }
            });
            const data = await response.json();
            setConnections(data);
        }
        catch (error) {
            console.error(error);
        }
    }
    return { connections, getConnections };
}

export function useNotificationHook() {
    const [notifications, setNotifications] = useState([]);
    const getNotifications = async () => {
        try{
            const auth = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_API_URL}/connect/req`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${auth}`,
                    'Content-Type': 'application/json',
        }
            });
            const data = await response.json();
            setNotifications(data);
        }
        catch (error) {
            console.error(error);
        }
    }
    return { notifications, getNotifications };
}

 export function useSendConncetionRequest() {
    const sendConnectionRequest = async (id) => {
        try{
            const auth = localStorage.getItem('token');
            await fetch(`${process.env.REACT_APP_API_URL}/connect/connect`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${auth}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({targetId: id})
            });
        }
        catch (error) {
            console.error(error);
        }
    }
    return { sendConnectionRequest };
}

export function useStatusConncetionRequest() {
    const statusConnectionRequest = async (id , status) => {
        try{
            const auth = localStorage.getItem('token');
            await fetch(`${process.env.REACT_APP_API_URL}/connect/status`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${auth}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({connectionId: id ,
                    status : status})
            });
        }
        catch (error) {
            console.error(error);
        }
    }
    return { statusConnectionRequest };
}

export function useGetFriends() {
    const [friends, setFriends] = useState([]);
    const getFriends = async () => {
        try{
            const auth = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_API_URL}/connect/friends`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${auth}`,
                    'Content-Type': 'application/json',
        }
            });
            const data = await response.json();
            setFriends(data);
        }
        catch (error) {
            console.error(error);
        }
    }
    return { friends, getFriends };
}

