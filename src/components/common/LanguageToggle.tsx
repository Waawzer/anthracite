"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage, Language } from '@/context/LanguageContext';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    const newLanguage: Language = language === 'fr' ? 'en' : 'fr';
    setLanguage(newLanguage);
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      className="relative flex items-center px-3 py-2 rounded-lg bg-card-bg/50 backdrop-blur-sm border border-accent/20 hover:border-accent/40 transition-all duration-300 group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative flex items-center space-x-2">
        {/* Language Labels */}
        <motion.div
          className="text-sm font-medium"
          animate={{
            color: language === 'fr' ? '#ffffff' : '#888888',
            scale: language === 'fr' ? 1.05 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          FR
        </motion.div>

        {/* Separator */}
        <div className="w-px h-4 bg-accent/30"></div>

        <motion.div
          className="text-sm font-medium"
          animate={{
            color: language === 'en' ? '#ffffff' : '#888888',
            scale: language === 'en' ? 1.05 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          EN
        </motion.div>
      </div>

      {/* Hover effect */}
      <motion.div
        className="absolute inset-0 rounded-lg bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />
    </motion.button>
  );
} 