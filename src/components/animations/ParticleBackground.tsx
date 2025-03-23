"use client";

import React, { useRef, useEffect, useState } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  shape: 'circle' | 'square' | 'triangle';
  rotation: number;
  rotationSpeed: number;
}

interface ParticleBackgroundProps {
  containerRef?: React.RefObject<HTMLDivElement | HTMLElement | null>;
}

export default function ParticleBackground({ containerRef }: ParticleBackgroundProps = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameId = useRef<number | null>(null);
  const isActive = useRef(true);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size based on container or window
    const resizeCanvas = () => {
      // If containerRef is provided, limit to that container's size
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
        canvas.width = rect.width;
        canvas.height = rect.height;
        canvas.style.position = "absolute";
        canvas.style.top = "0";
        canvas.style.left = "0";
      } else {
        // Otherwise use the full window
        const { innerWidth, innerHeight } = window;
        setDimensions({ width: innerWidth, height: innerHeight });
        canvas.width = innerWidth;
        canvas.height = innerHeight;
      }
      initParticles();
    };

    // Handle visibility change to pause animation when tab is not visible
    const handleVisibilityChange = () => {
      isActive.current = document.visibilityState === "visible";
      
      if (isActive.current && !animationFrameId.current) {
        animate();
      }
    };

    // Initialize particles - encore moins nombreuses (moitié)
    const initParticles = () => {
      const particleCount = Math.min(
        Math.floor((canvas.width * canvas.height) / 80000), // Divisé par 2 (40000 * 2)
        6 // Divisé par 2 (30 / 2)
      );
      
      particlesRef.current = [];

      // Couleurs vibrantes pour une meilleure visibilité - sans jaune ni vert
      const colors = [
        "#8a2be2", // Violet intense
        "#00FFFF", // Cyan vif
        "rgba(0, 191, 255, 1)", // Cyan
        "rgba(138, 43, 226, 1)", // Violet
      ];

      // Types de formes
      const shapes: Array<'circle' | 'square' | 'triangle'> = ['circle', 'square', 'triangle'];

      for (let i = 0; i < particleCount; i++) {
        // Taille beaucoup plus importante pour une meilleure visibilité
        const size = Math.random() * 25 + 25; // Particules entre 10 et 35px
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        
        // Centrer davantage les particules
        // Calculer les positions avec une concentration au centre (25%-75% de la zone)
        const centerBiasX = canvas.width * 0.25 + (Math.random() * canvas.width * 0.5);
        const centerBiasY = canvas.height * 0.25 + (Math.random() * canvas.height * 0.5);
        
        particlesRef.current.push({
          x: centerBiasX,
          y: centerBiasY,
          size,
          speedX: (Math.random() - 0.3) * 1.5, // Vitesse réduite
          speedY: (Math.random() - 0.3) * 1.5, // Vitesse réduite
          color: colors[Math.floor(Math.random() * colors.length)],
          shape,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.01,
        });
      }
    };

    // Animation loop optimisée
    let lastFrameTime = 0;
    const FRAME_RATE = 30; // Limite à 30 FPS pour de meilleures performances
    const FRAME_INTERVAL = 1000 / FRAME_RATE;

    const animate = (timestamp = 0) => {
      // Limiter le framerate pour améliorer les performances
      if (timestamp - lastFrameTime < FRAME_INTERVAL) {
        animationFrameId.current = requestAnimationFrame(animate);
        return;
      }
      
      lastFrameTime = timestamp;

      if (!isActive.current) {
        animationFrameId.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Dessiner les particules
      particlesRef.current.forEach((particle) => {
        // Mise à jour de la position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.rotation += particle.rotationSpeed;

        // Rebondissement aux bords de l'écran
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1;
        }

        // Dessiner les particules avec un effet de lueur (glow)
        ctx.save();
        ctx.beginPath();
        
        // Appliquer une légère luminosité et saturation
        ctx.filter = 'brightness(1.2) saturate(1.5)';
        
        // Définir la couleur avec une opacité de 0.9
        const color = particle.color.replace(')', ', 0.9)').replace('rgb', 'rgba');
        
        // Effet de lueur pour chaque particule
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = 25; // Augmenté pour plus de visibilité
        
        // Dessiner selon la forme
        if (particle.shape === 'circle') {
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();
        } else if (particle.shape === 'square') {
          ctx.translate(particle.x, particle.y);
          ctx.rotate(particle.rotation);
          ctx.rect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
          ctx.fillStyle = color;
          ctx.fill();
        } else if (particle.shape === 'triangle') {
          ctx.translate(particle.x, particle.y);
          ctx.rotate(particle.rotation);
          ctx.beginPath();
          ctx.moveTo(0, -particle.size / 2);
          ctx.lineTo(particle.size / 2, particle.size / 2);
          ctx.lineTo(-particle.size / 2, particle.size / 2);
          ctx.closePath();
          ctx.fillStyle = color;
          ctx.fill();
        }
        
        ctx.restore();
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    // Set up event listeners
    window.addEventListener("resize", resizeCanvas);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    
    // Observer container resize if applicable
    let resizeObserver: ResizeObserver | null = null;
    if (containerRef?.current) {
      resizeObserver = new ResizeObserver(resizeCanvas);
      resizeObserver.observe(containerRef.current);
    }

    // Initialize
    resizeCanvas();
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      
      if (resizeObserver && containerRef?.current) {
        resizeObserver.disconnect();
      }
      
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [containerRef]);

  return (
    <canvas
      ref={canvasRef}
      className={containerRef ? "absolute inset-0 w-full h-full -z-10" : "fixed inset-0 w-full h-full -z-10"}
      style={{ 
        pointerEvents: "none",
        filter: "contrast(1.7) brightness(1.5) blur(4px)" // Augmentation du contraste, luminosité et flou
      }}
    ></canvas>
  );
}
