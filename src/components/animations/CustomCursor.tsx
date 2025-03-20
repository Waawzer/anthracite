"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorVariant = "default" | "text" | "button" | "link";

export default function CustomCursor() {
  const [variant, setVariant] = useState<CursorVariant>("default");
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Create smooth springs for cursor follow
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Track cursor visibility (hide when inactive or leaves window)
  const [isVisible, setIsVisible] = useState(false);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);

      // Show cursor when it moves
      setIsVisible(true);

      // Reset inactivity timer
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }

      // Hide cursor after 3 seconds of inactivity
      inactivityTimerRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Detect elements and update cursor variant
    const updateCursorVariant = () => {
      const hoveredElement = document.elementFromPoint(
        cursorX.get() + 16,
        cursorY.get() + 16
      );

      if (!hoveredElement) return;

      // Check for button or link elements
      if (
        hoveredElement.tagName === "BUTTON" ||
        hoveredElement.tagName === "A" ||
        hoveredElement.closest("button") ||
        hoveredElement.closest("a")
      ) {
        setVariant("button");
      } else if (
        // Check for text elements
        hoveredElement.tagName === "P" ||
        hoveredElement.tagName === "H1" ||
        hoveredElement.tagName === "H2" ||
        hoveredElement.tagName === "H3" ||
        hoveredElement.tagName === "SPAN" ||
        hoveredElement.tagName === "LI"
      ) {
        setVariant("text");
      } else {
        setVariant("default");
      }
    };

    const interval = setInterval(updateCursorVariant, 100);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
      clearInterval(interval);
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, [cursorX, cursorY]);

  // Different cursor styles based on context
  const cursorVariants = {
    default: {
      width: 32,
      height: 32,
      borderRadius: "50%",
      backgroundColor: "transparent",
      border: "1.5px solid var(--accent)",
      mixBlendMode: "difference" as const,
    },
    text: {
      width: 80,
      height: 80,
      borderRadius: "50%",
      backgroundColor: "var(--accent)",
      opacity: 0.1,
      mixBlendMode: "difference" as const,
    },
    button: {
      width: 64,
      height: 64,
      borderRadius: "50%",
      backgroundColor: "var(--accent)",
      opacity: 0.4,
      mixBlendMode: "difference" as const,
    },
  };

  // Hide on mobile devices
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    return null;
  }

  return (
    <motion.div
      className="cursor fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        opacity: isVisible ? 1 : 0,
      }}
      animate={variant}
      variants={cursorVariants}
      transition={{
        type: "spring",
        damping: 30,
        stiffness: 200,
      }}
    />
  );
}
