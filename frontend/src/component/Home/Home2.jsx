import React, { useState } from 'react';
import SearchPage from '../SearchPage/SearchPage';
import ChatPage from '../ChatPage/ChatPage';
import { useModal } from '../context/ModalContext';
import Layout from '../Layout/Layout';
import { useResponsive } from '../context/responsiveContext';

const Home2 = () => {
  const { isModalOpen } = useModal();

  // const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  // const [showRightComponent, setShowRightComponent] = useState(false);

  // // Update screen size on window resize
  // React.useEffect(() => {
  //   const handleResize = () => {
  //     setIsSmallScreen(window.innerWidth < 768);
  //     if (window.innerWidth >= 768) {
  //       setShowRightComponent(true); // Show both components for larger screens
  //     }
  //   };

  //   handleResize(); // Set initial value
  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);
  const {isSmallScreen , showRightComponent} = useResponsive();

  return (
    <>
      {isSmallScreen ? (
        <div
          className={`w-full h-screen transition-all duration-300 ${
            isModalOpen ? 'blur-sm pointer-events-none' : ''
          }`}
        >
          {showRightComponent ? (
            <div className="w-full">
              <SearchPage  />
              
            </div>
          ) : (
            <div className="w-full bg-pink-900">
              <ChatPage />
             
            </div>
          )}
        </div>
      ) : (
        <div
          className={`flex w-full h-screen transition-all duration-300 ${
            isModalOpen ? 'blur-sm pointer-events-none' : ''
          }`}
        >
          {/* Search Page Section */}
          <div className="basis-3/12">
            <SearchPage />
          </div>

          {/* Chat Page Section */}
          <div className="basis-9/12 bg-pink-900">
            <ChatPage />
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <Layout />
        </div>
      )}
    </>
  );
};

export default Home2;
