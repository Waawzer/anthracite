"use client";

import React, { useRef, useEffect, useState } from "react";
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

  const { scrollY } = useScroll();

  useEffect(() => {
    if (!ref.current) return;

    const setValues = () => {
      setElementTop(ref.current?.offsetTop || 0);
      setClientHeight(window.innerHeight);
    };

    setValues();
    window.addEventListener("resize", setValues);

    return () => window.removeEventListener("resize", setValues);
  }, [ref]);

  const initial = elementTop - clientHeight;
  const final = elementTop + (ref.current?.offsetHeight || 0);

  const yRange = useTransform(
    scrollY,
    [initial, final],
    [speed * 100, -speed * 100]
  );
  const xRange = useTransform(
    scrollY,
    [initial, final],
    [speed * 100, -speed * 100]
  );

  const y = useSpring(yRange, { stiffness: 100, damping: 30 });
  const x = useSpring(xRange, { stiffness: 100, damping: 30 });

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={{
          [direction === "vertical" ? "y" : "x"]:
            direction === "vertical" ? y : x,
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
