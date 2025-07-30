import React, { useContext } from 'react';
import { LanguageContext } from '../App';

const LanguageSelector = () => {
  const { language, setLanguage } = useContext(LanguageContext);

  const toggleLanguage = () => {
    setLanguage(lang => (lang === 'fr' ? 'en' : 'fr'));
  };

  return (
    <button
      onClick={toggleLanguage}
      className="btn btn-secondary"
    >
      {language === 'fr' ? 'English' : 'Français'}
    </button>
  );
};

export default LanguageSelector;