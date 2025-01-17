import React from 'react';
import SearchPage from '../SearchPage/SearchPage';
import './Home.css';
import ChatPage2 from '../ChatPage/ChatPage2';
import { useResponsive } from '../context/responsiveContext';

const Home = () => {
  const { isSmallScreen } = useResponsive();

  return (
    <>
      {!isSmallScreen ? (
        <div className="w-full flex h-screen">
          {/* Search Page Section */}
          <div className="w-3/12 border-r border-gray-300 h-full">
            <SearchPage />
          </div>
          
          {/* Chat Page Section */}
          <div className="w-9/12 h-full">
            <ChatPage2 />
          </div>
        </div>
      ) : (
        <div className="w-full h-screen">
          {/* Only Search Page on Small Screen */}
          <SearchPage />
        </div>
      )}
    </>
  );
};

export default Home;
