import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the global data
type GlobalDataType = {
  UserName: string;
  MatchName: string;
  Color: string;
};

// Define the context type
type GlobalDataContextType = {
  globalData: GlobalDataType;
  setData: (username?: string, matchname?: string, color?: string) => void;
};

// Create the context
const GlobalDataContext = createContext<GlobalDataContextType | undefined>(undefined);

// Create the provider component
export const GlobalDataProvider = ({ children }: { children: ReactNode }) => {
  const [globalData, setGlobalData] = useState<GlobalDataType>({ UserName: "", MatchName: "", Color: "" });

  const setData = (username: string = "", matchname: string = "", color: string = globalData.Color) => {
    setGlobalData({
      UserName: username || globalData.UserName,
      MatchName: matchname || globalData.MatchName,
      Color: color ||  globalData.Color,
    });
  };

  return (
    <GlobalDataContext.Provider value={{ globalData, setData }}>
      {children}
    </GlobalDataContext.Provider>
  );
};

// Custom hook to use the GlobalData context
export const useGlobalData = () => {
  const context = useContext(GlobalDataContext);
  if (!context) {
    throw new Error('useGlobalData must be used within a GlobalDataProvider');
  }
  return context;
};
