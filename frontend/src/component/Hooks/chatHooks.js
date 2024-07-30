import { useState, useEffect } from 'react';

export function useGetAllUser() {
    const [alluser, setAllUser] = useState([]);
    const [error, setError] = useState(null);

    const getAllUser = async () => {
        try {
            const authToken = localStorage.getItem('token');
            const response = await fetch('http://localhost:8000/api/v1/chat/getalluser', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            setAllUser(responseData);
        } catch (error) {
            console.error('Failed to fetch users:', error);
            setError(error.message);
        }
    };

    useEffect(() => {
        getAllUser();
    }, []);

    return { alluser, getAllUser, error };
}


export function useGetAllChat() {
    const [allChat, setAllChat] = useState([]);
    const [error, setError] = useState(null);
    

    const getAllChat = async () => {
        try {
            const authToken = localStorage.getItem('token');
            const response = await fetch('http://localhost:8000/api/v1/chat/fetch', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            setAllChat(responseData);
        } catch (error) {
            console.error('Failed to fetch users:', error);
            setError(error.message);
        }
    };

    useEffect(() => {
        getAllChat();
    }, []);

    return { allChat, getAllChat, error };
}

export function useGetLoggedInUser() {
    const [user , setUser] = useState("")
    const getLoggedInUser = async() =>{
        try {
            const authToken = localStorage.getItem('token');
            const response = await fetch('http://localhost:8000/api/v1/users/logg', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            setUser(responseData);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getLoggedInUser()
    },[])
    return{user}
}
    
