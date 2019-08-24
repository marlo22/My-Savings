import React, { useState } from 'react';

import { defaultLanguage } from '../../config';

const GlobalContext = React.createContext({
  isNavOpen: false,
  language: defaultLanguage,
  toggleNav: () => null,
  switchLangauge: () => null
});

export const GlobalContextProvider = ({ children }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [language, setLanguage] = useState(defaultLanguage);

  const toggleNav = () =>
    setIsNavOpen(prevValue => !prevValue);

  const switchLangauge = langCode =>
    setLanguage(langCode);

  return (
    <GlobalContext.Provider
      value={{
        isNavOpen,
        language,
        toggleNav,
        switchLangauge
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
};

export default GlobalContext;