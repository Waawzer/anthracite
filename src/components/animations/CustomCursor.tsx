"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorVariant = "default" | "text" | "button" | "link";

export default function CustomCursor() {
  const [variant, setVariant] = useState<CursorVariant>("default");
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Create smoother springs for cursor follow with increased damping
  const springConfig = { damping: 35, stiffness: 250 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Track cursor visibility (hide when inactive or leaves window)
  const [isVisible, setIsVisible] = useState(false);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Track the last update time to throttle element checks
  const lastUpdateTime = useRef(0);
  // Store the interval ID for cleanup
  const checkIntervalRef = useRef<NodeJS.Timeout | null>(null);

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

    // Throttled function to update cursor variant
    const updateCursorVariant = () => {
      const now = Date.now();
      // Limit checks to once every 150ms for performance
      if (now - lastUpdateTime.current < 150) return;
      lastUpdateTime.current = now;
      
      const hoveredElement = document.elementFromPoint(
        cursorX.get() + 16,
        cursorY.get() + 16
      );

      if (!hoveredElement) return;

      // Use dataset attributes for more efficient detection when possible
      const elementRole = hoveredElement.getAttribute('data-cursor-role');
      if (elementRole) {
        if (elementRole === 'button' || elementRole === 'link') {
          setVariant('button');
          return;
        } else if (elementRole === 'text') {
          setVariant('text');
          return;
        }
      }

      // Fallback to traditional tag checking with cached selectors
      if (
        hoveredElement.tagName === "BUTTON" ||
        hoveredElement.tagName === "A" ||
        hoveredElement.closest("button") ||
        hoveredElement.closest("a")
      ) {
        setVariant("button");
      } else if (
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

    // Use a less frequent interval for element checking
    checkIntervalRef.current = setInterval(updateCursorVariant, 150);

    // Use passive event listeners for better performance
    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    window.addEventListener("mouseenter", handleMouseEnter, { passive: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
      
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
      }
      
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
      width: 64, // Reduced from 80px
      height: 64, // Reduced from 80px
      borderRadius: "50%",
      backgroundColor: "var(--accent)",
      opacity: 0.1,
      mixBlendMode: "difference" as const,
    },
    button: {
      width: 48, // Reduced from 64px
      height: 48, // Reduced from 64px
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
        damping: 40, // Increased damping
        stiffness: 150, // Decreased stiffness for smoother motion
        mass: 0.8, // Added mass for momentum
      }}
    />
  );
}
