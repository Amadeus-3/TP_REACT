import React, { useContext } from 'react';
import { ThemeContext, LanguageContext } from "../App";

const ThemeToggle = () => {
  const { isDarkTheme, setIsDarkTheme } = useContext(ThemeContext);
  const { translations } = useContext(LanguageContext);

  return (
    <button
      onClick={() => setIsDarkTheme(!isDarkTheme)}
      className={`px-5 py-2 rounded ${
        isDarkTheme
          ? "bg-dark text-light border border-light"
          : "bg-light text-dark border border-dark"
      }`}
    >
      {isDarkTheme ? translations.lightMode : translations.darkMode}
    </button>
  );
};

export default ThemeToggle;