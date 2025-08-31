import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="text-sm font-semibold text-gray-600 hover:text-brand-blue border border-gray-300 rounded-full px-3 py-1 transition-colors"
      aria-label={`Switch to ${language === 'en' ? 'Spanish' : 'English'}`}
    >
      {language === 'en' ? 'ES' : 'EN'}
    </button>
  );
};

export default LanguageSwitcher;