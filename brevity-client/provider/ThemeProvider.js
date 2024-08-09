import {createContext, useContext, useState} from 'react';

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({children}) {
  const [theme, setTheme] = useState('light');

  const toggleMode = () => {
    setTheme(prevMode => (prevMode === 'dark' ? 'light' : 'dark'));
  };

  const contextData = {
    theme,
    toggleMode,
  };

  return (
    <ThemeContext.Provider value={contextData}>
      {children}
    </ThemeContext.Provider>
  );
}
