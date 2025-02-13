import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Context
const ResponsiveContext = createContext();

// Provider Component
export const ResponsiveProvider = ({ children, breakpoint = 768 }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < breakpoint);
  const [showRightComponent, setShowRightComponent] = useState(window.innerWidth >= breakpoint);

  useEffect(() => {
    const handleResize = () => {
      const isSmall = window.innerWidth < breakpoint;
      setIsSmallScreen(isSmall);
      setShowRightComponent(!isSmall); // Show right component only for larger screens
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return (
    <ResponsiveContext.Provider
      value={{ isSmallScreen, showRightComponent, setShowRightComponent }}
    >
      {children}
    </ResponsiveContext.Provider>
  );
};

export const useResponsive = () => {
  return useContext(ResponsiveContext);
};

