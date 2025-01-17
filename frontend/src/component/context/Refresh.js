
import { createContext, useContext, useState } from 'react';


const Refresh = createContext();

export const RefreshProvider = ({ children }) => {
  const [shouldUpdate, setShouldUpdate] = useState(false);


  const triggerUpdate = () => {
    setShouldUpdate(prev => !prev);
  };


  return (
    <Refresh.Provider value={{ triggerUpdate , shouldUpdate}}>
      {children}
    </Refresh.Provider>
  );
};

export const useSupplier = () => useContext(Refresh);
