import { useState, useEffect } from 'react';
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


    
export function useAccessChat() {
    const accessChat = async(userId) =>{
        try {
            const authToken = localStorage.getItem('token');
            const response = await fetch('http://localhost:8000/api/v1/chat/access', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body : JSON.stringify({
                    userId : userId
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

           return await response.json();
        } catch (error) {
            console.log(error)
        }
    }
    return{accessChat}
}


export function useGetFetchChat() {
    const [connectedChat , setConnectedChat] = useState([])
    const getFetchChat = async() =>{
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
            setConnectedChat(responseData);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getFetchChat()
    },[])
    return{connectedChat}
}

   
export function useCreateGroup() {
    const createGroup = async(userArray , chatName) =>{
        try {
            const authToken = localStorage.getItem('token');
            const response = await fetch('http://localhost:8000/api/v1/chat/group', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body : JSON.stringify({ userArray, chatName })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

           return await response.json();
        } catch (error) {
            console.log(error)
        }
    }
    return{createGroup}
}

