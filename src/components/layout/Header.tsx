"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

const navItems = [
  { name: "Accueil", href: "/", delay: 0.1 },
  { name: "Services", href: "/#services", delay: 0.2 },
  { name: "Réalisations", href: "/#realisations", delay: 0.3 },
  { name: "Garanties", href: "/#garanties", delay: 0.4 },
  { name: "Contact", href: "/contact", delay: 0.5 },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("/");
  const { scrollY } = useScroll();

  // Animation values based on scroll
  const headerOpacity = useTransform(scrollY, [0, 50], [0.95, 1]);
  const headerBlur = useTransform(scrollY, [0, 100], [0, 8]);
  const headerBorderOpacity = useTransform(scrollY, [0, 100], [0, 0.2]);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.95]);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }

      // Detect active section
      const sections = ["/", "services", "realisations", "garanties"];
      for (const section of sections) {
        const element = document.getElementById(
          section === "/" ? "hero" : section
        );
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section === "/" ? "/" : `/#${section}`);
            break;
          }
        }
      }
    };

    document.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  // Prevent body scrolling when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const menuVariants = {
    closed: {
      opacity: 0,
      clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)",
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren",
      },
    },
    open: {
      opacity: 1,
      clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)",
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.07,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: -50 },
    open: { opacity: 1, x: 0 },
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={
          {
            backgroundColor: scrolled
              ? "rgba(28, 30, 35, var(--opacity))"
              : "transparent",
            backdropFilter: scrolled ? `blur(${headerBlur.get()}px)` : "none",
            borderBottom: scrolled
              ? `1px solid rgba(75, 85, 99, ${headerBorderOpacity.get()})`
              : "none",
            boxShadow: scrolled ? `0 4px 20px rgba(0, 0, 0, 0.1)` : "none",
            "--opacity": headerOpacity,
          } as React.CSSProperties
        }
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo with light effect */}
            <motion.div
              className="flex-shrink-0 relative group"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              style={{ scale: logoScale }}
            >
              <Link
                href="/"
                className="flex flex-col items-start font-bold tracking-tight relative z-10 py-2"
              >
                <motion.span
                  className="text-2xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-accent via-purple-500 to-blue-500 group-hover:from-white group-hover:via-white group-hover:to-white/90 transition-all duration-500"
                  initial={{ x: 0 }}
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  style={{ textShadow: "0 0 20px rgba(147, 51, 234, 0.3)" }}
                >
                  Anthracite
                </motion.span>
                <motion.span
                  className="text-sm md:text-lg bg-clip-text text-transparent bg-gradient-to-r from-accent via-purple-500 to-blue-500 group-hover:from-white group-hover:via-white group-hover:to-white/90 transition-all duration-500 ml-24"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  initial={{ x: 0 }}
                  whileHover={{ x: -10 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 15,
                    backgroundPosition: {
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear",
                    },
                  }}
                  style={{
                    textShadow:
                      "0 0 20px rgba(147, 51, 234, 0.5), 0 0 30px rgba(79, 70, 229, 0.3)",
                    filter: "brightness(1.2) contrast(1.1)",
                  }}
                >
                  Apps
                </motion.span>
              </Link>
              <motion.div className="absolute -inset-2 bg-gradient-to-r from-purple-600/0 via-purple-600/15 to-blue-500/0 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition duration-500"></motion.div>
            </motion.div>

            {/* Menu Button with glow effect */}
            <div>
              <button
                type="button"
                className="relative inline-flex items-center justify-center p-2 rounded-md text-secondary hover:text-primary focus:outline-none group"
                aria-expanded={mobileMenuOpen}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">Toggle menu</span>
                <motion.span
                  className="absolute inset-0 -z-10 bg-gradient-to-tr from-accent/0 via-accent/5 to-purple-500/0 opacity-0 group-hover:opacity-100 blur-sm rounded-full transition-opacity duration-300"
                  whileHover={{ scale: 1.2 }}
                ></motion.span>
                <motion.div
                  className="w-6 h-6 flex flex-col justify-center items-center"
                  animate={mobileMenuOpen ? "open" : "closed"}
                >
                  <motion.span
                    className="block w-5 h-0.5 bg-current mb-1.5"
                    variants={{
                      closed: { rotate: 0, y: 0 },
                      open: { rotate: 45, y: 2 },
                    }}
                    transition={{ duration: 0.3 }}
                  ></motion.span>
                  <motion.span
                    className="block w-5 h-0.5 bg-current"
                    variants={{
                      closed: { opacity: 1 },
                      open: { opacity: 0 },
                    }}
                    transition={{ duration: 0.3 }}
                  ></motion.span>
                  <motion.span
                    className="block w-5 h-0.5 bg-current mt-1.5"
                    variants={{
                      closed: { rotate: 0, y: 0 },
                      open: { rotate: -45, y: -2 },
                    }}
                    transition={{ duration: 0.3 }}
                  ></motion.span>
                </motion.div>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-background/90 backdrop-blur-xl flex flex-col items-center justify-center overflow-hidden"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>

            {/* Glowing orbs for background */}
            <motion.div
              className="absolute -top-40 left-20 w-[300px] h-[300px] bg-purple-600 rounded-full opacity-10 blur-[80px]"
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
              className="absolute bottom-20 right-0 w-[400px] h-[400px] bg-cyan-500 rounded-full opacity-10 blur-[100px]"
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

            {/* Navigation Items */}
            <nav className="container mx-auto px-8 py-16 text-center relative z-10">
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  className="my-8"
                  variants={itemVariants}
                  transition={{ duration: 0.5 }}
                >
                  <Link
                    href={item.href}
                    className="text-4xl md:text-5xl font-bold text-primary hover:text-white transition-colors duration-300 group relative"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="relative inline-block">
                      {activeSection === item.href && (
                        <motion.span
                          className="absolute -left-8 top-1/2 transform -translate-y-1/2 w-6 h-6 text-accent"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          •
                        </motion.span>
                      )}
                      {item.name}
                      <motion.span
                        className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-accent via-purple-500 to-blue-500 origin-left"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      ></motion.span>
                    </span>
                    <motion.span
                      className="absolute -inset-8 bg-gradient-to-r from-accent/0 via-accent/5 to-purple-500/0 rounded-full blur opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    ></motion.span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Social Links */}
            <motion.div
              className="absolute bottom-8 left-0 w-full flex justify-center gap-6"
              variants={itemVariants}
            >
              {["Twitter", "LinkedIn", "GitHub", "Instagram"].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  className="text-secondary hover:text-accent transition-colors duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  <span className="sr-only">{social}</span>
                  <div className="w-8 h-8 flex items-center justify-center rounded-full border border-border/30 backdrop-blur-sm">
                    {social[0]}
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
