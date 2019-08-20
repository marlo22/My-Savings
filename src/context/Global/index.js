import React, { useState } from 'react';

const GlobalContext = React.createContext({
  isNavOpen: false,
  toggleNav: () => null
});

export const GlobalContextConsumer = GlobalContext.Consumer;

export const GlobalContextProvider = ({ children }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () =>
    setIsNavOpen(prevValue => !prevValue);

  return (
    <GlobalContext.Provider
      value={{
        isNavOpen,
        toggleNav
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
};