"use client";

import React, { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import GuaranteesSection from "@/components/home/GuaranteesSection";
import CustomCursor from "@/components/animations/CustomCursor";
import SectionTransition from "@/components/animations/SectionTransition";
import ParallaxEffect from "@/components/animations/ParallaxEffect";
import { motion, useScroll, useSpring } from "framer-motion";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Fix pour le rendu iOS et compatibilité générale
  useEffect(() => {
    // Fix pour problèmes de rendu sur iOS
    document.documentElement.style.backgroundColor = "#f5f5f5";
    
    // Pour le mode sombre
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.style.backgroundColor = "#0a0a0a";
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.add("light");
    }

    // Force un re-paint pour iOS
    const timeoutID = setTimeout(() => {
      const body = document.body;
      body.style.display = 'none';
      void body.offsetHeight; // Force reflow
      body.style.display = '';
    }, 100);

    // Disable the effect if prefers-reduced-motion is enabled
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return () => clearTimeout(timeoutID);
    }

    // Enable smooth scrolling behavior
    document.documentElement.style.scrollBehavior = "smooth";

    // Clean up
    return () => {
      document.documentElement.style.scrollBehavior = "";
      clearTimeout(timeoutID);
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <Header />

      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent z-50 origin-left"
        style={{ scaleX }}
      />

      <main className="scroll-container overflow-hidden">
        <SectionTransition>
          <HeroSection />
        </SectionTransition>

        <SectionTransition direction="right" delay={0.1}>
          <ParallaxEffect speed={0.2}>
            <ServicesSection />
          </ParallaxEffect>
        </SectionTransition>

        <SectionTransition direction="left" delay={0.1}>
          <ProjectsSection />
        </SectionTransition>

        <SectionTransition direction="up" delay={0.2}>
          <ParallaxEffect speed={0.1} direction="horizontal">
            <GuaranteesSection />
          </ParallaxEffect>
        </SectionTransition>

        <SectionTransition>
          <Footer />
        </SectionTransition>
      </main>
    </>
  );
}
