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
      className="relative flex items-center p-2 rounded-lg bg-card-bg/50 backdrop-blur-sm border border-accent/20 hover:border-accent/40 transition-all duration-300 group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative flex items-center space-x-2">
        {/* Flag icons */}
        <div className="flex items-center space-x-1">
          <motion.div
            className={`w-6 h-4 rounded-sm overflow-hidden border border-white/20 ${
              language === 'fr' ? 'opacity-100 scale-100' : 'opacity-60 scale-90'
            }`}
            animate={{
              opacity: language === 'fr' ? 1 : 0.6,
              scale: language === 'fr' ? 1 : 0.9,
            }}
            transition={{ duration: 0.3 }}
          >
            {/* French flag */}
            <div className="w-full h-full flex">
              <div className="w-1/3 h-full bg-[#002654]"></div>
              <div className="w-1/3 h-full bg-white"></div>
              <div className="w-1/3 h-full bg-[#CE1126]"></div>
            </div>
          </motion.div>
          
          <motion.div
            className="text-xs font-medium text-primary"
            animate={{
              color: language === 'fr' ? '#ffffff' : '#888888',
            }}
            transition={{ duration: 0.3 }}
          >
            FR
          </motion.div>
        </div>

        {/* Separator */}
        <div className="w-px h-4 bg-accent/30"></div>

        <div className="flex items-center space-x-1">
          <motion.div
            className={`w-6 h-4 rounded-sm overflow-hidden border border-white/20 ${
              language === 'en' ? 'opacity-100 scale-100' : 'opacity-60 scale-90'
            }`}
            animate={{
              opacity: language === 'en' ? 1 : 0.6,
              scale: language === 'en' ? 1 : 0.9,
            }}
            transition={{ duration: 0.3 }}
          >
            {/* UK flag */}
            <div className="w-full h-full bg-[#012169] relative">
              {/* White diagonal stripes */}
              <div className="absolute inset-0">
                <div className="w-full h-full relative">
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-white transform -skew-y-[33deg] origin-left"></div>
                  <div className="absolute top-0 right-0 w-full h-[2px] bg-white transform skew-y-[33deg] origin-right"></div>
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white transform skew-y-[33deg] origin-left"></div>
                  <div className="absolute bottom-0 right-0 w-full h-[2px] bg-white transform -skew-y-[33deg] origin-right"></div>
                </div>
              </div>
              {/* Red diagonal stripes */}
              <div className="absolute inset-0">
                <div className="w-full h-full relative">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-[#C8102E] transform -skew-y-[33deg] origin-left"></div>
                  <div className="absolute top-0 right-0 w-full h-[1px] bg-[#C8102E] transform skew-y-[33deg] origin-right"></div>
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#C8102E] transform skew-y-[33deg] origin-left"></div>
                  <div className="absolute bottom-0 right-0 w-full h-[1px] bg-[#C8102E] transform -skew-y-[33deg] origin-right"></div>
                </div>
              </div>
              {/* White cross */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-[2px] bg-white"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[2px] h-full bg-white"></div>
              </div>
              {/* Red cross */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-[1px] bg-[#C8102E]"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[1px] h-full bg-[#C8102E]"></div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            className="text-xs font-medium text-primary"
            animate={{
              color: language === 'en' ? '#ffffff' : '#888888',
            }}
            transition={{ duration: 0.3 }}
          >
            EN
          </motion.div>
        </div>
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