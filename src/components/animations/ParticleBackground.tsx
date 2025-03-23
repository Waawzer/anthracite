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

  // Initialize particles - moins nombreuses et concentrées au centre
  const initParticles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const particleCount = Math.min(
      Math.floor((canvas.width * canvas.height) / 80000), // Divisé par 2
      6 // Nombre maximum de particules
    );
    
    particlesRef.current = [];

    // Couleurs vibrantes pour une meilleure visibilité
    const colors = [
      "#8a2be2", // Violet intense
      "#00FFFF", // Cyan vif
      "rgba(0, 191, 255, 1)", // Cyan
      "rgba(138, 43, 226, 1)", // Violet
    ];

    // Types de formes
    const shapes: Array<'circle' | 'square' | 'triangle'> = ['circle', 'square', 'triangle'];

    for (let i = 0; i < particleCount; i++) {
      // Taille importante pour une meilleure visibilité
      const size = Math.random() * 25 + 25; // Particules entre 25 et 50px
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

  const initAnimationFrame = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    
    if (!canvas || !ctx) return;
    
    // Tracking
    let lastFrameTime = 0;
    const FRAME_RATE = 30; // Limite à 30 FPS pour de meilleures performances
    const FRAME_INTERVAL = 1000 / FRAME_RATE;

    // Setup animation functions
    const handleVisibilityChange = () => {
      isActive.current = document.visibilityState === "visible";
    };

    // Animation loop
    const animate = (timestamp = 0) => {
      if (!isActive.current) {
        animationFrameId.current = requestAnimationFrame(animate);
        return;
      }

      // Limiter le framerate pour améliorer les performances
      if (timestamp - lastFrameTime < FRAME_INTERVAL) {
        animationFrameId.current = requestAnimationFrame(animate);
        return;
      }
      
      lastFrameTime = timestamp;

      // Effacer le canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Dessiner et mettre à jour chaque particule
      particlesRef.current.forEach((particle) => {
        // Mettre à jour la position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.rotation += particle.rotationSpeed;

        // Faire rebondir sur les bords
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1;
        }

        // Dessiner la particule
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);
        
        ctx.fillStyle = particle.color;
        
        if (particle.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, particle.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (particle.shape === 'square') {
          ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
        } else if (particle.shape === 'triangle') {
          ctx.beginPath();
          ctx.moveTo(0, -particle.size / 2);
          ctx.lineTo(particle.size / 2, particle.size / 2);
          ctx.lineTo(-particle.size / 2, particle.size / 2);
          ctx.closePath();
          ctx.fill();
        }
        
        ctx.restore();
      });

      // Continuer l'animation
      animationFrameId.current = requestAnimationFrame(animate);
    };

    // Start animation
    document.addEventListener("visibilitychange", handleVisibilityChange);
    animationFrameId.current = requestAnimationFrame(animate);

    // Return cleanup function
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  };

  useEffect(() => {
    // Ajuster la taille du canvas pour qu'il couvre tout l'écran ou le conteneur
    const updateCanvasSize = () => {
      if (!canvasRef.current) return;

      if (containerRef && containerRef.current) {
        // Si un conteneur est fourni, ajuster à la taille du conteneur
        const container = containerRef.current;
        canvasRef.current.width = container.clientWidth;
        canvasRef.current.height = container.clientHeight;
      } else {
        // Sinon, couvrir tout l'écran
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }

      // Recalculer le nombre de particules basé sur la nouvelle taille
      initParticles();
    };

    // Mettre à jour la taille du canvas lors du montage et redimensionnement
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Observer container resize if applicable
    let resizeObserver: ResizeObserver | null = null;
    if (containerRef?.current) {
      resizeObserver = new ResizeObserver(updateCanvasSize);
      resizeObserver.observe(containerRef.current);
    }

    // Animation des particules
    const cleanupAnimation = initAnimationFrame();

    // Nettoyer quand le composant est démonté
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (resizeObserver) {
        if (containerRef?.current) {
          resizeObserver.unobserve(containerRef.current);
        }
        resizeObserver.disconnect();
      }
      if (cleanupAnimation) cleanupAnimation();
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
