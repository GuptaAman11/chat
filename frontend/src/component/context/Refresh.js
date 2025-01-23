
import { createContext, useContext, useState } from 'react';


const Refresh = createContext();

export const RefreshProvider = ({ children }) => {
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [userName, setUserName] = useState("")
  const [chatProfileImage, setChatProfileImage] = useState("")



  const triggerUpdate = () => {
    setShouldUpdate(prev => !prev);
  };


  return (
    <Refresh.Provider value={{ triggerUpdate , shouldUpdate , userName , setUserName , setChatProfileImage , chatProfileImage }}>
      {children}
    </Refresh.Provider>
  );
};

export const useSupplier = () => useContext(Refresh);
