"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function AnimatedBackground() {
  const { scrollY } = useScroll();

  // Translate background elements based on scroll position
  const yBg1 = useTransform(scrollY, [0, 1000], [0, -50]);
  const yBg2 = useTransform(scrollY, [0, 1000], [0, -100]);
  const yBg3 = useTransform(scrollY, [0, 1000], [0, -150]);
  const opacityBg = useTransform(scrollY, [0, 300], [1, 0.5]);

  return (
    <div className="fixed inset-0 overflow-hidden -z-10 bg-background">
      {/* Animated gradients */}
      <motion.div
        className="absolute top-10 left-10 w-[600px] h-[600px] rounded-full bg-purple-500/10 blur-[120px]"
        style={{ y: yBg1, opacity: opacityBg }}
      />
      <motion.div
        className="absolute bottom-40 right-20 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[100px]"
        style={{ y: yBg2, opacity: opacityBg }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-cyan-500/10 blur-[150px]"
        style={{ y: yBg3, opacity: opacityBg }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-noise-pattern opacity-5" />
    </div>
  );
}
