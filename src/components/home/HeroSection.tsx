"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import ParticleBackground from "../animations/ParticleBackground";

const rotatingWords = [
  "aux tendances actuelles",
  "aux animations fluides",
  "modernisé et attrayant",
  "pour une expérience utilisateur",
  "et revisité pour le référencement",
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

  // Fonction de défilement fluide avec compatibilité cross-browser renforcée
  const handleDiscoverClick = () => {
    const servicesSection = document.getElementById("services");

    if (servicesSection) {
      // Position cible avec prise en compte du scroll actuel
      const offsetTop =
        servicesSection.getBoundingClientRect().top + window.scrollY;

      // Approche multiple pour maximiser la compatibilité

      // 1. Animation avec requestAnimationFrame pour plus de fluidité
      const duration = 1000; // ms
      const startPosition = window.scrollY;
      const distance = offsetTop - startPosition;
      const startTime = performance.now();

      const animateScroll = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);

        // Fonction easing pour un défilement naturel
        const easeInOutQuad = (t: number) =>
          t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

        window.scrollTo(0, startPosition + distance * easeInOutQuad(progress));

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };

      // 2. Essayer également l'API native (en parallèle)
      try {
        // Approche moderne
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });

        // Approche scrollIntoView comme backup
        setTimeout(() => {
          servicesSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 10);
      } catch {
        console.log("Utilisation de l'animation de scroll personnalisée");
      }

      // Lancer notre animation personnalisée dans tous les cas comme garantie
      requestAnimationFrame(animateScroll);
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
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 group"
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
                "linear-gradient(to right, #f0abfc, #818cf8, #7dd3fc)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow:
                "0 0 40px rgba(147, 51, 234, 0.4), 0 0 50px rgba(79, 70, 229, 0.3)",
            }}
          >
            Votre site web{" "}
            <motion.span
              className="relative inline-block"
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.3 },
              }}
              style={{
                background: "linear-gradient(-45deg, #d946ef, #38bdf8)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow:
                  "0 0 40px rgba(217, 70, 239, 0.6), 0 0 60px rgba(56, 189, 248, 0.5)",
              }}
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-[#ec4899] via-[#8b5cf6] to-[#06b6d4] opacity-0 blur-xl rounded-full -z-10"
                initial={{ opacity: 0 }}
                whileHover={{
                  opacity: 0.8,
                  scale: 1.4,
                  transition: { duration: 0.3 },
                }}
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              ></motion.span>
              <motion.div
                className="absolute -inset-4 -z-10 pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 bg-white rounded-full"
                    initial={{
                      x: 0,
                      y: 0,
                      opacity: 0,
                      scale: 0,
                    }}
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      x: [0, (Math.random() - 0.5) * 40],
                      y: [0, (Math.random() - 0.5) * 40],
                    }}
                    transition={{
                      duration: 1 + Math.random() * 0.5,
                      repeat: Infinity,
                      delay: Math.random() * 0.5,
                    }}
                  />
                ))}
              </motion.div>
              <motion.span
                className="absolute -inset-1 rounded-lg opacity-0 -z-10"
                style={{
                  background: `linear-gradient(90deg, 
                    rgba(236,72,153,0) 0%, 
                    rgba(139,92,246,0.7) 50%, 
                    rgba(6,182,212,0) 100%)`,
                }}
                initial={{ opacity: 0, rotate: 0 }}
                whileHover={{
                  opacity: 1,
                  rotate: 360,
                  transition: { duration: 2, repeat: Infinity, ease: "linear" },
                }}
              ></motion.span>
              3.0
            </motion.span>
          </motion.h1>

          <div className="h-20 flex justify-center items-center mb-12">
            <AnimatePresence mode="wait">
              <motion.p
                key={wordIndex}
                className="text-2xl md:text-3xl lg:text-2xl font-bold text-white py-4"
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
              <span className="text-white font-semibold text-sm">
                Découvrir
              </span>
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
