"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import GeometricScene from "../3d/GeometricScene";
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      setMousePosition({
        x: (clientX - innerWidth / 2) / innerWidth,
        y: (clientY - innerHeight / 2) / innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Spring animations for smoother movement
  const springX = useSpring(useMotionValue(0), { stiffness: 50, damping: 20 });
  const springY = useSpring(useMotionValue(0), { stiffness: 50, damping: 20 });

  useEffect(() => {
    springX.set(mousePosition.x * 7);
    springY.set(mousePosition.y * 4);
  }, [mousePosition, springX, springY]);

  // Parallax effect for scrolling
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const subtitleScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const buttonOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.6], [0.5, 0.1]);

  // Rotating words effect
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
          <div className="absolute inset-0">
            <motion.div
              className="w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 2 }}
            >
              <div className="absolute inset-0 overflow-hidden">
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full bg-white/5"
                    style={{
                      width: Math.random() * 4 + 1,
                      height: Math.random() * 4 + 1,
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, Math.random() * 100 + 50],
                      opacity: [0, 0.8, 0],
                    }}
                    transition={{
                      duration: Math.random() * 10 + 10,
                      repeat: Infinity,
                      delay: Math.random() * 5,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Glowing orbs */}
      <motion.div
        className="absolute -top-40 -left-40 w-[400px] h-[400px] bg-purple-600 rounded-full opacity-10 blur-[100px]"
        style={{
          x: useTransform(springX, (v) => -v * 2),
          y: useTransform(springY, (v) => -v * 2),
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      ></motion.div>

      <motion.div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500 rounded-full opacity-10 blur-[120px]"
        style={{
          x: useTransform(springX, (v) => v * 3),
          y: useTransform(springY, (v) => v * 3),
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.18, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1,
        }}
      ></motion.div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] z-10"></div>

      {/* Laser line effects */}
      <motion.div
        className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-accent/30 to-transparent z-10"
        style={{
          top: useTransform(springY, (v) => `calc(33% + ${v * 20}px)`),
        }}
      ></motion.div>
      <motion.div
        className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent z-10"
        style={{
          top: useTransform(springY, (v) => `calc(66% + ${v * 30}px)`),
        }}
      ></motion.div>

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
              x: useTransform(springX, (v) => v * 3),
              y: useTransform(springY, (v) => v * 3),
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
                  backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                3.0
              </motion.span>
            </motion.span>
          </motion.h1>

          <motion.div
            className="h-32 flex justify-center items-center mb-12"
            style={{ scale: subtitleScale }}
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={wordIndex}
                className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/70 py-2"
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  x: useTransform(springX, (v) => v * -4),
                  y: useTransform(springY, (v) => v * -4),
                  textShadow:
                    "0 0 30px rgba(255, 255, 255, 0.1), 0 0 60px rgba(255, 255, 255, 0.05)",
                }}
              >
                {rotatingWords[wordIndex]}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ opacity: buttonOpacity }}
            className="relative"
          >
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-accent via-purple-500 to-blue-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"
              animate={{
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            ></motion.div>
            <motion.a
              href="#services"
              className="relative flex items-center justify-center px-6 py-2 bg-background/90 backdrop-blur-sm rounded-full text-base font-medium text-white border border-accent/20 shadow-lg hover:shadow-accent/20 transition duration-300 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-white font-semibold text-base">
                Découvrir
              </span>
              <motion.svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                animate={{
                  x: [0, 5, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                  delay: 1,
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                  className="text-accent"
                ></path>
              </motion.svg>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: 1.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ opacity: buttonOpacity }}
      >
        <motion.svg
          className="w-10 h-10 text-white opacity-70"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </motion.svg>
      </motion.div>
    </section>
  );
}
