"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface StickyScrollProps {
  children: React.ReactNode;
  height?: number;
  className?: string;
}

export default function StickyScroll({
  children,
  height = 1,
  className = "",
}: StickyScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        setContainerHeight(window.innerHeight * height);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [height]);

  const y = useTransform(scrollYProgress, [0, 1], [0, containerHeight * 0.5]);

  return (
    <div
      ref={containerRef}
      style={{
        height: `${containerHeight}px`,
      }}
      className={`relative ${className}`}
    >
      <motion.div
        style={{ y }}
        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
      >
        {children}
      </motion.div>
    </div>
  );
}
