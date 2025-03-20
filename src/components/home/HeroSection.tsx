"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import dynamic from "next/dynamic";
import GeometricScene from "../3d/GeometricScene";
import ParticleBackground from "../animations/ParticleBackground";

const rotatingWords = [
  "aux tendances actuelles",
  "remis au goût du jour",
  "moderne et attrayant",
  "rapide et performant",
  "accessible et responsive",
];

// Importation dynamique sans SSR pour les éléments avec des valeurs aléatoires
const ParticleEffect = dynamic(() => import("../animations/ParticleEffect"), {
  ssr: false,
});

// Importation dynamique sans SSR pour les éléments avec des animations
const AnimatedGlowOrbs = dynamic(() => import("../animations/GlowOrbs"), {
  ssr: false,
});

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef(null);

  // Assurez-vous que le code ne s'exécute que côté client
  useEffect(() => {
    setIsMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      setMousePosition({
        x: (clientX - innerWidth / 2) / innerWidth,
        y: (clientY - innerHeight / 2) / innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  // Spring animations for smoother movement
  const springX = useSpring(useMotionValue(0), { stiffness: 50, damping: 20 });
  const springY = useSpring(useMotionValue(0), { stiffness: 50, damping: 20 });

  // Mise à jour des springs en fonction de la position de la souris
  useEffect(() => {
    if (isMounted) {
      springX.set(mousePosition.x * 7);
      springY.set(mousePosition.y * 4);
    }
  }, [mousePosition, springX, springY, isMounted]);

  // Parallax effect for scrolling
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.6], [0.5, 0.1]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      id="hero"
    >
      {/* Darkened overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background/95 z-10"></div>
      <motion.div
        className="absolute inset-0 bg-black/60 z-[5]"
        style={{ opacity: backgroundOpacity }}
      ></motion.div>

      {/* Background effects */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y: backgroundY }}
      >
        <motion.div style={{ filter: "brightness(0.7) contrast(1.2)" }}>
          <ParticleBackground />
          <GeometricScene />

          {/* Added center glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[60%] h-[60%] rounded-full bg-gradient-radial from-accent/10 via-primary/5 to-transparent blur-[100px] opacity-40"></div>
          </div>

          {/* Additional particle layer */}
          {isMounted && <ParticleEffect />}
        </motion.div>
      </motion.div>

      {/* Glowing orbs */}
      {isMounted && <AnimatedGlowOrbs springX={springX} springY={springY} />}

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] z-10"></div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="max-w-3xl mx-auto"
          style={{
            y: titleY,
          }}
        >
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.2,
              ease: [0.25, 1, 0.5, 1],
              delay: 0.2,
            }}
            style={{
              background:
                "linear-gradient(to right, #9333ea, #4f46e5, #0ea5e9)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow:
                "0 0 20px rgba(147, 51, 234, 0.1), 0 0 40px rgba(79, 70, 229, 0.05)",
            }}
          >
            Votre site web{" "}
            <motion.span
              className="relative inline-block"
              animate={{
                textShadow: [
                  "0 0 10px rgba(147, 51, 234, 0.3)",
                  "0 0 20px rgba(147, 51, 234, 0.5)",
                  "0 0 10px rgba(147, 51, 234, 0.3)",
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "loop",
              }}
              whileHover={{
                scale: 1.1,
                filter: "brightness(1.3)",
                textShadow: "0 0 20px rgba(147, 51, 234, 0.9)",
              }}
            >
              <motion.span
                className="relative z-10"
                style={{
                  display: "inline-block",
                  background: "linear-gradient(-45deg, #9333ea, #0ea5e9)",
                  backgroundSize: "200% 200%",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  repeatType: "mirror",
                }}
              >
                {rotatingWords[wordIndex]}
              </motion.span>
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: [0.25, 1, 0.5, 1],
              delay: 0.4,
            }}
            style={{
              textShadow:
                "0 0 30px rgba(255, 255, 255, 0.1), 0 0 60px rgba(255, 255, 255, 0.05)",
            }}
          >
            Nous créons des sites web élégants, rapides et accessibles qui
            aident votre entreprise à se démarquer.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.25, 1, 0.5, 1],
              delay: 0.6,
            }}
          >
            <motion.a
              href="#contact"
              className="inline-flex items-center px-6 py-2 bg-gradient-to-br from-primary to-accent text-white font-medium rounded-lg shadow-lg transition-all duration-300 group"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Demander un devis
              <motion.span
                className="ml-2 w-5 h-5"
                initial={{ x: 0 }}
                animate={{ x: [0, 5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                  repeatDelay: 2.5,
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </motion.span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
