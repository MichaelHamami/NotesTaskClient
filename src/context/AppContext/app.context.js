import React, { useContext, useState } from 'react';

const AppContext = React.createContext();

const AppContextProvider = ({ children }) => {
  const [isAppLoading, setIsAppLoading] = useState(false);

  const setAppToLoading = () => {
    setIsAppLoading(true);
  };

  const setAppToFinishedLoad = () => {
    setIsAppLoading(false);
  };

  return (
    <AppContext.Provider
      value={{
        isAppLoading,
        setAppToFinishedLoad,
        setAppToLoading,
      }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error('useAppContext Error');
  }

  return context;
};

export { AppContextProvider, useAppContext };
