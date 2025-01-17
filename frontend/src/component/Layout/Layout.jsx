import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar.jsx';
import Dashboard from './Dashboard';
import Member from './Member';
import { useParams } from 'react-router-dom';

const Layout = () => {
    const [chats, setChats] = useState();
    const [activeComponent, setActiveComponent] = useState('dashboard');
    const {chatId} = useParams()

    const findChatById = async(chatId) => {
        const authToken = localStorage.getItem('token');
        const response = await fetch(`${process.env.REACT_APP_API_URL}/chat/findsinglechat/${chatId}` , {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        })
        const responseData = await response.json();
        setChats(responseData);
    }

    useEffect(()=>{
        findChatById(chatId)
    },[chatId])

    const renderContent = () => {
        switch (activeComponent) {
            case 'dashboard':
                return <Dashboard chatName = {chats?.chatName} />;
            case 'Members':
                return <Member chatMember = {chats?.users}/>;
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="flex my-auto mx-auto rounded-md">
            {/* Sidebar */}
            <Sidebar setActiveComponent={setActiveComponent} />

            {/* Main Content */}
            <main className="bg-gray-100 p-6 overflow-hidden" style={{ width: '800px', height: '600px' }}>
                {renderContent()}
            </main>
            lorem200
        </div>
    );
};

export default Layout;
