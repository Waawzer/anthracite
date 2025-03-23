"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import ParticleBackground from "../animations/ParticleBackground";

const rotatingWords = [
  "aux tendances actuelles",
  "remis au goût du jour",
  "moderne et attrayant",
  "rapide et performant",
  "accessible et responsive",
];

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Effect pour initialiser le drapeau client-only après le montage
  useEffect(() => {
    setMounted(true);
  }, []);

  // Suivi de la position de la souris
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / window.innerWidth,
        y: (e.clientY - window.innerHeight / 2) / window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animation fluide pour la position de la souris
  const springX = useSpring(useMotionValue(0), { stiffness: 50, damping: 20 });
  const springY = useSpring(useMotionValue(0), { stiffness: 50, damping: 20 });

  useEffect(() => {
    springX.set(mousePosition.x * 12);
    springY.set(mousePosition.y * 8);
  }, [mousePosition, springX, springY]);

  // Rotating words effect
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Nouvelle approche avec scroll directement vers un élément plutôt que son ID
  const handleDiscoverClick = () => {
    // Trouver la section services
    const servicesSection = document.getElementById('services');
    
    if (servicesSection) {
      // Désactiver temporairement les comportements qui pourraient interférer
      document.body.style.overflowY = 'hidden';
      
      // Force un tick de rendu avant de déclencher le défilement
      requestAnimationFrame(() => {
        // Obtenir la position exacte
        const offsetTop = servicesSection.getBoundingClientRect().top + window.pageYOffset;
        
        // Technique 1: scrollIntoView
        servicesSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
        
        // Technique 2 (fallback): window.scrollTo, exécuté avec un léger délai pour ne pas interférer
        setTimeout(() => {
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
          
          // Réactiver le défilement
          document.body.style.overflowY = '';
        }, 50);
      });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      id="hero"
    >
      {/* Particules en arrière-plan */}
      {mounted && <ParticleBackground containerRef={containerRef} />}

      {/* Simple overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/80 z-10"></div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center">
        <div className="max-w-3xl mx-auto">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.2,
              ease: [0.25, 1, 0.5, 1],
              delay: 0.2,
            }}
            style={{
              x: useTransform(springX, (v) => v * 5),
              y: useTransform(springY, (v) => v * 5),
              background:
                "linear-gradient(to right, #a855f7, #6366f1, #38bdf8)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow:
                "0 0 25px rgba(147, 51, 234, 0.3), 0 0 45px rgba(79, 70, 229, 0.2)",
            }}
          >
            Votre site web{" "}
            <span
              className="relative inline-block"
              style={{
                background: "linear-gradient(-45deg, #a855f7, #38bdf8)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              3.0
            </span>
          </motion.h1>

          <div className="h-20 flex justify-center items-center mb-12">
            <AnimatePresence mode="wait">
              <motion.p
                key={wordIndex}
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-white py-2"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  x: useTransform(springX, (v) => v * -6),
                  y: useTransform(springY, (v) => v * -6),
                }}
              >
                {rotatingWords[wordIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative flex justify-center"
          >
            <motion.button
              onClick={handleDiscoverClick}
              className="relative flex items-center justify-center px-5 py-2.5 bg-background/90 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-accent/20 shadow-lg hover:shadow-accent/20 transition duration-300 group w-32"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-white font-semibold text-sm">Découvrir</span>
              <svg
                className="ml-2.5 w-4.5 h-4.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                  className="text-accent"
                ></path>
              </svg>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
