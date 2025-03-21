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
import GeometricShapes from "../animations/GeometricShapes";
// import BasicGeometric from "../3d/BasicGeometric";

const rotatingWords = [
  "aux tendances actuelles",
  "remis au goût du jour",
  "moderne et attrayant",
  "rapide et performant",
  "accessible et responsive",
];

// Interface pour les particules
interface Particle {
  width: number;
  height: number;
  top: string;
  left: string;
  duration: number;
  delay: number;
  distance: number;
}

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  // Effect pour initialiser le drapeau client-only après le montage
  useEffect(() => {
    setMounted(true);

    // Générer les particules côté client uniquement
    const newParticles = Array.from({ length: 20 }).map(() => ({
      width: Math.random() * 4 + 1,
      height: Math.random() * 4 + 1,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
      distance: Math.random() * 100 + 50,
    }));

    setParticles(newParticles);
  }, []);

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
    springX.set(mousePosition.x * 12);
    springY.set(mousePosition.y * 8);
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
      {/* Formes géométriques au premier plan */}
      {mounted && <GeometricShapes />}

      {/* Darkened overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/85 z-10"></div>
      <motion.div
        className="absolute inset-0 bg-black/50 z-[5]"
        style={{ opacity: backgroundOpacity }}
      ></motion.div>

      {/* Background effects */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y: backgroundY }}
      >
        <motion.div style={{ filter: "brightness(1.0) contrast(1.4)" }}>
          {mounted && (
            <>
              <ParticleBackground />
              <div
                className="relative z-[2]"
                style={{
                  filter: "drop-shadow(0 0 30px rgba(147, 51, 234, 0.5))",
                  mixBlendMode: "screen",
                }}
              >
                <GeometricScene />
              </div>
            </>
          )}

          {/* Added center glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[60%] h-[60%] rounded-full bg-gradient-radial from-accent/20 via-primary/10 to-transparent blur-[100px] opacity-60"></div>
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
                {mounted &&
                  particles.map((particle, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full bg-white/5"
                      style={{
                        width: particle.width,
                        height: particle.height,
                        top: particle.top,
                        left: particle.left,
                      }}
                      animate={{
                        y: [0, particle.distance],
                        opacity: [0, 0.8, 0],
                      }}
                      transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        delay: particle.delay,
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
              filter: "brightness(1.2) contrast(1.1)",
            }}
          >
            Votre site web{" "}
            <motion.span
              className="relative inline-block"
              animate={{
                textShadow: [
                  "0 0 15px rgba(147, 51, 234, 0.5)",
                  "0 0 30px rgba(147, 51, 234, 0.8)",
                  "0 0 15px rgba(147, 51, 234, 0.5)",
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "loop",
              }}
              whileHover={{
                scale: 1.1,
                filter: "brightness(1.5)",
                textShadow: "0 0 30px rgba(147, 51, 234, 0.9)",
              }}
            >
              <motion.span
                className="relative z-10"
                style={{
                  display: "inline-block",
                  background: "linear-gradient(-45deg, #a855f7, #38bdf8)",
                  backgroundSize: "200% 200%",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "brightness(1.3) contrast(1.2)",
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
                className="text-2xl md:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/70 py-2"
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  x: useTransform(springX, (v) => v * -6),
                  y: useTransform(springY, (v) => v * -6),
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
