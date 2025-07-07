"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isTransitioning: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Load saved language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') as Language;
    if (savedLanguage && (savedLanguage === 'fr' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language preference to localStorage with transition effect
  const handleSetLanguage = (lang: Language) => {
    if (lang === language) return;
    
    setIsTransitioning(true);
    
    // Small delay to show the fade effect
    setTimeout(() => {
      setLanguage(lang);
      localStorage.setItem('preferred-language', lang);
      
      // End transition after content is updated
      setTimeout(() => {
        setIsTransitioning(false);
      }, 150);
    }, 150);
  };

  // Translation function
  const t = (key: string): string => {
    const { getTranslation } = require('@/translations');
    return getTranslation(language, key);
  };

  const value = {
    language,
    setLanguage: handleSetLanguage,
    t,
    isTransitioning,
  };

  return (
    <LanguageContext.Provider value={value}>
      <div 
        className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
      >
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 