"use client";

import React, { useRef, useEffect } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  alpha: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mousePosition = useRef({ x: 0, y: 0 });
  const isActive = useRef(true);

  // Initialize particles on component mount
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const { innerWidth, innerHeight } = window;
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      initParticles();
    };

    // Handle mouse movement to influence particles
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    // Handle visibility change to pause animation when tab is not visible
    const handleVisibilityChange = () => {
      isActive.current = document.visibilityState === "visible";
    };

    // Initialize particles
    const initParticles = () => {
      const particleCount = Math.min(
        Math.floor((canvas.width * canvas.height) / 12000),
        100
      );
      particles.current = [];

      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 3 + 1;
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size,
          speedX: Math.random() * 0.2 - 0.1,
          speedY: Math.random() * 0.2 - 0.1,
          color: getParticleColor(),
          alpha: Math.random() * 0.5 + 0.1,
        });
      }
    };

    const getParticleColor = () => {
      const colors = [
        "rgba(0, 191, 255, 1)", // Cyan
        "rgba(138, 43, 226, 1)", // Violet
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    // Animation loop
    const animate = () => {
      if (!isActive.current) {
        requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach((particle) => {
        // Update particle position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Boundary check with wrap around
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;

        // Mouse interaction - particles move away from cursor
        const dx = particle.x - mousePosition.current.x;
        const dy = particle.y - mousePosition.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 100;

        if (distance < maxDistance) {
          const force = (1 - distance / maxDistance) * 0.2;
          particle.speedX += (dx * force) / distance;
          particle.speedY += (dy * force) / distance;
        }

        // Speed damping
        particle.speedX *= 0.99;
        particle.speedY *= 0.99;

        // Draw particle
        ctx.globalAlpha = particle.alpha;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw connections between close particles
      ctx.globalAlpha = 0.1;
      ctx.strokeStyle = "#8a2be2";
      ctx.lineWidth = 0.3;

      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          const dx = particles.current[i].x - particles.current[j].x;
          const dy = particles.current[i].y - particles.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.globalAlpha = 0.1 * (1 - distance / 150);
            ctx.beginPath();
            ctx.moveTo(particles.current[i].x, particles.current[i].y);
            ctx.lineTo(particles.current[j].x, particles.current[j].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };

    // Set up event listeners
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Initialize
    resizeCanvas();
    animate();

    // Cleanup event listeners
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      isActive.current = false;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-20 bg-transparent"
      style={{ pointerEvents: "none" }}
    ></canvas>
  );
}
