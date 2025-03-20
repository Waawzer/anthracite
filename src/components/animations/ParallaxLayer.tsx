"use client";

import React, { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  direction?: "up" | "down";
}

export default function ParallaxLayer({
  children,
  speed = 0.5,
  className = "",
  direction = "up",
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Adjust the movement based on the direction
  const effectiveSpeed = direction === "up" ? -speed * 100 : speed * 100;

  const y = useTransform(scrollYProgress, [0, 1], [0, effectiveSpeed]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
