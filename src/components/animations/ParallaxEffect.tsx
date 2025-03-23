"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface ParallaxEffectProps {
  children: React.ReactNode;
  speed?: number;
  direction?: "vertical" | "horizontal";
  className?: string;
}

export default function ParallaxEffect({
  children,
  speed = 0.5,
  direction = "vertical",
  className = "",
}: ParallaxEffectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [elementTop, setElementTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);

  // Improve scroll performance with custom options
  const { scrollY } = useScroll({
    // Improve performance with passive listeners
    layoutEffect: false,
    // Only measure at a reduced rate
    container: undefined
  });

  // Add throttling for resize event
  const resizeTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const setValues = () => {
      setElementTop(ref.current?.offsetTop || 0);
      setClientHeight(window.innerHeight);
    };

    // Initial measurement
    setValues();

    // Throttled resize handler
    const handleResize = () => {
      if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current);
      
      resizeTimerRef.current = setTimeout(() => {
        setValues();
      }, 200);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current);
    };
  }, [ref]);

  // Calculate ranges with smaller effect to improve performance
  const initial = elementTop - clientHeight;
  const final = elementTop + (ref.current?.offsetHeight || 0);

  // Reduce movement amount for better performance
  const yRange = useTransform(
    scrollY,
    [initial, final],
    [speed * 70, -speed * 70]
  );
  const xRange = useTransform(
    scrollY,
    [initial, final],
    [speed * 70, -speed * 70]
  );

  // Add higher damping for smoother, more efficient animations
  const springConfig = { stiffness: 75, damping: 40, mass: 0.8 };
  const y = useSpring(yRange, springConfig);
  const x = useSpring(xRange, springConfig);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={{
          [direction === "vertical" ? "y" : "x"]:
            direction === "vertical" ? y : x,
          willChange: "transform" // Add GPU acceleration hint
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
