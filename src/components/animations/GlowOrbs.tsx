"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";

interface GlowOrbsProps {
  springX: MotionValue<number>;
  springY: MotionValue<number>;
}

export default function GlowOrbs({ springX, springY }: GlowOrbsProps) {
  return (
    <>
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
    </>
  );
}
