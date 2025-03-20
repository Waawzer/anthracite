"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface SectionTransitionProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export default function SectionTransition({
  children,
  direction = "up",
  delay = 0,
  duration = 0.8,
  className = "",
  once = true,
}: SectionTransitionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-10% 0px -10% 0px" });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    } else if (!once) {
      mainControls.start("hidden");
    }
  }, [isInView, mainControls, once]);

  const getVariants = () => {
    const distance = 100;
    let initialProps = {};

    switch (direction) {
      case "up":
        initialProps = { y: distance };
        break;
      case "down":
        initialProps = { y: -distance };
        break;
      case "left":
        initialProps = { x: distance };
        break;
      case "right":
        initialProps = { x: -distance };
        break;
    }

    return {
      hidden: {
        ...initialProps,
        opacity: 0,
        filter: "blur(5px)",
      },
      visible: {
        y: 0,
        x: 0,
        opacity: 1,
        filter: "blur(0px)",
        transition: {
          duration,
          delay,
          ease: [0.25, 0.1, 0.25, 1],
        },
      },
    };
  };

  return (
    <motion.div
      ref={ref}
      variants={getVariants()}
      initial="hidden"
      animate={mainControls}
      className={className}
    >
      {children}
    </motion.div>
  );
}
