import React, { createContext, useContext, useState, useEffect } from 'react';

interface ContextProviderProps {
  children: JSX.Element;
}

interface ContextType {
  isMobile: boolean;
  isMenuOpened: boolean;
  setIsMenuOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const IsMobileContext = createContext<ContextType>({
  isMobile: window.innerWidth <= 1000,
  isMenuOpened: false,
  setIsMenuOpened: useState,
});

export function useIsMobile() {
  return useContext(IsMobileContext);
}

export function IsMobileProvider({ children }: ContextProviderProps) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const onResize = () => {
    setIsMobile(window.innerWidth <= 1000);
  };

  useEffect(() => {
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <IsMobileContext.Provider
      value={{ isMobile, isMenuOpened, setIsMenuOpened }}
    >
      {children}
    </IsMobileContext.Provider>
  );
}
