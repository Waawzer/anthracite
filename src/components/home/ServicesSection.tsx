"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useAnimationControls,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import RevealOnScroll from "../animations/RevealOnScroll";

// Define the shape types for the card bottom shapes
interface CardShape {
  type: "circle" | "square" | "triangle";
  size: number;
  color: string;
  position: number; // Position from left (0-100%)
}

interface ServiceData {
  title: string;
  description: string;
  extendedDescription: string[];
  icon: React.ReactNode;
  delay: number;
  id: string;
  shapes?: CardShape[]; // Add shapes to service data
}

// Component for rendering the geometric shapes at the bottom of each card
function CardBottomShapes({
  shapes,
  isVisible,
}: {
  shapes?: CardShape[];
  isVisible: boolean;
}) {
  if (!isVisible || !shapes || shapes.length === 0) return null;

  // Only use the first shape to ensure uniqueness per card
  const shape = shapes[0];

  let shapeElement;

  if (shape.type === "circle") {
    shapeElement = (
      <div
        className="absolute rounded-full"
        style={{
          width: `${shape.size}px`,
          height: `${shape.size}px`,
          backgroundColor: shape.color,
          left: `${shape.position}%`,
          bottom: `28px`,
          transform: "translateX(-50%)",
        }}
      />
    );
  } else if (shape.type === "square") {
    shapeElement = (
      <div
        className="absolute"
        style={{
          width: `${shape.size}px`,
          height: `${shape.size}px`,
          backgroundColor: shape.color,
          left: `${shape.position}%`,
          bottom: `28px`,
          transform: "translateX(-50%) rotate(45deg)",
        }}
      />
    );
  } else if (shape.type === "triangle") {
    shapeElement = (
      <div
        className="absolute"
        style={{
          width: 0,
          height: 0,
          borderLeft: `${shape.size / 2}px solid transparent`,
          borderRight: `${shape.size / 2}px solid transparent`,
          borderBottom: `${shape.size}px solid ${shape.color}`,
          left: `${shape.position}%`,
          bottom: `28px`,
          transform: "translateX(-50%)",
        }}
      />
    );
  }

  return (
    <div className="absolute bottom-0 left-0 w-full h-12 overflow-visible">
      {shapeElement}
    </div>
  );
}

function ServiceCard({
  service,
  isExpanded,
  mouseX,
  mouseY,
  onToggle,
}: {
  service: ServiceData;
  isExpanded: boolean;
  mouseX: React.MutableRefObject<number>;
  mouseY: React.MutableRefObject<number>;
  onToggle: (serviceId: string) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();

  const [relativeX, setRelativeX] = useState(0);
  const [relativeY, setRelativeY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Create motion values that persist across renders
  const xMotionValue = useMotionValue(relativeX);
  const yMotionValue = useMotionValue(relativeY);

  // Update motion values when relative positions change
  useEffect(() => {
    xMotionValue.set(relativeX);
    yMotionValue.set(relativeY);
  }, [relativeX, relativeY, xMotionValue, yMotionValue]);

  // Subtle rotation effect with reduced intensity
  const rotateX = useTransform(yMotionValue, [-0.5, 0.5], [0.8, -0.8]);
  const rotateY = useTransform(xMotionValue, [-0.5, 0.5], [-0.8, 0.8]);

  // Smooth motion with increased damping for stability
  const springRotateX = useSpring(rotateX, { stiffness: 70, damping: 50 });
  const springRotateY = useSpring(rotateY, { stiffness: 70, damping: 50 });

  // Subtle shadow movement with reduced intensity
  const shadowX = useTransform(xMotionValue, [-0.5, 0.5], ["-4px", "4px"]);
  const shadowY = useTransform(yMotionValue, [-0.5, 0.5], ["-4px", "4px"]);
  const shadowBlur = useTransform(
    useMotionValue(Math.sqrt(relativeX * relativeX + relativeY * relativeY)),
    [0, 0.7],
    ["10px", "15px"]
  );

  useEffect(() => {
    if (!isHovering) {
      // Smoothly reset position when not hovering
      const resetInterval = setInterval(() => {
        setRelativeX((prev) => prev * 0.9);
        setRelativeY((prev) => prev * 0.9);

        // Stop the interval when we're close enough to zero
        if (Math.abs(relativeX) < 0.01 && Math.abs(relativeY) < 0.01) {
          setRelativeX(0);
          setRelativeY(0);
          clearInterval(resetInterval);
        }
      }, 20);

      return () => clearInterval(resetInterval);
    }

    const updatePosition = () => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate mouse position relative to card center with reduced intensity
      const newRelativeX = ((mouseX.current - centerX) / rect.width) * 0.5;
      const newRelativeY = ((mouseY.current - centerY) / rect.height) * 0.5;

      // Apply smoothing by taking small steps toward the target position
      setRelativeX((prev) => prev + (newRelativeX - prev) * 0.08);
      setRelativeY((prev) => prev + (newRelativeY - prev) * 0.08);
    };

    // Use RAF for smoother animation with throttling
    let lastUpdateTime = 0;
    let rafId: number;

    const updateFrame = (timestamp: number) => {
      // Throttle updates to every ~16ms (60fps)
      if (timestamp - lastUpdateTime > 16) {
        updatePosition();
        lastUpdateTime = timestamp;
      }
      rafId = requestAnimationFrame(updateFrame);
    };

    rafId = requestAnimationFrame(updateFrame);
    return () => cancelAnimationFrame(rafId);
  }, [mouseX, mouseY, isHovering, relativeX, relativeY]);

  // Handle hover and expanded effects with smoother transitions
  useEffect(() => {
    if (isExpanded) {
      controls.start({
        scale: 1.01,
        boxShadow: "0 12px 30px rgba(0, 0, 0, 0.15)",
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
      });
    } else {
      controls.start({
        scale: 1,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
      });
    }
  }, [isExpanded, controls]);

  // Optimized glow effect based on mouse position
  const glowOpacity = useTransform(
    useMotionValue(Math.sqrt(relativeX * relativeX + relativeY * relativeY)),
    [0, 0.4],
    [0.12, 0]
  );

  const glowX = useTransform(xMotionValue, [-0.5, 0.5], ["30%", "70%"]);
  const glowY = useTransform(yMotionValue, [-0.5, 0.5], ["30%", "70%"]);

  return (
    <RevealOnScroll delay={service.delay} className="group relative">
      <motion.div
        ref={cardRef}
        className={`flex flex-col rounded-xl overflow-hidden bg-card-bg border ${
          isExpanded ? "border-accent/40" : "border-card-border"
        } shadow-lg transition-all duration-500 relative p-8`}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
          transform: "perspective(1200px)",
          boxShadow: `${shadowX.get()} ${shadowY.get()} ${shadowBlur.get()} rgba(0, 0, 0, 0.1)`,
          minHeight: isExpanded ? "none" : "320px",
        }}
        animate={controls}
        whileHover={{ scale: isExpanded ? 1.01 : 1.005 }}
        initial={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 30,
          mass: 0.8,
        }}
        layout="position"
        onHoverStart={() => setIsHovering(true)}
        onHoverEnd={() => setIsHovering(false)}
      >
        {/* Toggle button */}
        <motion.div
          className="absolute top-4 right-4 z-20 w-6 h-6 flex items-center justify-center rounded-full bg-accent/10 hover:bg-accent/20 text-accent cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => {
            e.stopPropagation(); // Prevent event from bubbling to parent
            onToggle(service.id);
          }}
        >
          {isExpanded ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 12H4"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          )}
        </motion.div>

        {/* Enhanced glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent pointer-events-none"
          style={{
            opacity: glowOpacity,
            background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(147, 51, 234, 0.2), transparent 70%)`,
          }}
          animate={{
            opacity: isExpanded ? 0.15 : glowOpacity.get(),
          }}
          transition={{ duration: 0.6 }}
        />

        {/* Background accent for expanded state with smoother transition */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isExpanded ? 0.8 : 0,
            transition: { duration: 0.6, ease: "easeInOut" },
          }}
        />

        <div className="flex items-center mb-6 z-10">
          <motion.div
            className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent mr-4"
            whileHover={{ scale: 1.05 }}
            animate={
              isExpanded
                ? {
                    scale: [1, 1.05, 1],
                    rotate: [0, 3, -3, 0],
                  }
                : { scale: 1, rotate: 0 }
            }
            transition={{
              duration: 2.5,
              repeat: isExpanded ? Infinity : 0,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            {service.icon}
          </motion.div>
          <h3 className="text-xl font-bold gradient-accent z-10">
            {service.title}
          </h3>
        </div>

        <p className="text-secondary text-base mb-6 z-10">
          {service.description}
        </p>

        {/* Expanded content with improved transition */}
        <motion.div
          initial={false}
          animate={{
            height: isExpanded ? "auto" : "0px",
            opacity: isExpanded ? 1 : 0,
            marginTop: isExpanded ? "1.5rem" : "0rem",
          }}
          className="overflow-hidden z-10"
          style={{
            pointerEvents: isExpanded ? "auto" : "none",
            position: "relative",
          }}
          transition={{
            height: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 0.4, delay: isExpanded ? 0.1 : 0 },
            marginTop: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
          }}
        >
          <motion.div
            className="border-t border-border pt-6 space-y-6"
            initial={false}
            animate={{ y: isExpanded ? 0 : 10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <h4 className="font-bold text-primary mb-3 text-lg flex items-center">
              <motion.span
                className="inline-block mr-2 text-accent"
                animate={{
                  rotate: isExpanded ? [0, 5, -5, 0] : 0,
                  scale: isExpanded ? [1, 1.1, 1] : 1,
                }}
                transition={{
                  duration: 3,
                  ease: "easeInOut",
                  repeat: isExpanded ? Infinity : 0,
                  repeatType: "reverse",
                  repeatDelay: 2,
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </motion.span>
              Nos prestations incluent:
            </h4>
            <ul className="space-y-4">
              {service.extendedDescription.map((item, idx) => (
                <motion.li
                  key={idx}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{
                    opacity: isExpanded ? 1 : 0,
                    x: isExpanded ? 0 : -10,
                  }}
                  transition={{
                    duration: 0.4,
                    delay: isExpanded ? idx * 0.07 : 0,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <motion.div
                    className="mt-1 mr-3 text-accent flex-shrink-0"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                        className="text-gradient"
                        style={{
                          stroke: "url(#checkGradient)",
                        }}
                      />
                    </svg>
                    <svg width="0" height="0" className="absolute">
                      <linearGradient
                        id="checkGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#9333ea" />
                        <stop offset="50%" stopColor="#4f46e5" />
                        <stop offset="100%" stopColor="#0ea5e9" />
                      </linearGradient>
                    </svg>
                  </motion.div>
                  <span className="text-secondary">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Geometric shapes at bottom of card - only visible when not expanded */}
        <CardBottomShapes shapes={service.shapes} isVisible={!isExpanded} />
      </motion.div>
    </RevealOnScroll>
  );
}

export default function ServicesSection() {
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(
    null
  );

  // Mouse tracking
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const toggleServiceDetails = (serviceId: string) => {
    setExpandedServiceId((prev) => (prev === serviceId ? null : serviceId));
  };

  const toggleAllServices = () => {
    setExpandedServiceId((prev) => (prev ? null : "all"));
  };

  const services: ServiceData[] = [
    {
      id: "site-vitrine",
      title: "Sites Vitrines",
      description:
        "Des sites web élégants et performants qui présentent votre entreprise et ses valeurs. Avec une attention particulière à l'expérience utilisateur et au référencement.",
      extendedDescription: [
        "Design personnalisé et responsive adapté à votre image de marque",
        "Optimisation SEO pour un meilleur classement dans les moteurs de recherche",
        "Intégration des médias sociaux et outils d'analyse de trafic",
        "Formulaires de contact et maps interactives",
        "Structure de navigation intuitive et expérience utilisateur optimisée",
        "Maintenance et mises à jour régulières",
      ],
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      delay: 0.1,
      shapes: [{ type: "circle", size: 22, color: "#8a2be2", position: 50 }],
    },
    {
      id: "applications-web",
      title: "Applications Web",
      description:
        "Des applications web sur mesure avec des interfaces utilisateur intuitives et des fonctionnalités avancées. Nous développons des solutions évolutives adaptées à vos besoins.",
      extendedDescription: [
        "Développement full-stack avec les technologies les plus récentes",
        "Interfaces utilisateur interactives et réactives",
        "Gestion d'utilisateurs et authentification sécurisée",
        "Tableaux de bord et visualisations de données",
        "API RESTful et intégrations avec services tiers",
        "Architecture évolutive pour accompagner la croissance de votre activité",
      ],
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      ),
      delay: 0.2,
      shapes: [{ type: "triangle", size: 26, color: "#00bfff", position: 50 }],
    },
    {
      id: "e-commerce",
      title: "E-commerce",
      description:
        "Des boutiques en ligne performantes qui offrent une expérience d'achat fluide et sécurisée. Nos solutions e-commerce sont optimisées pour maximiser les conversions.",
      extendedDescription: [
        "Plateformes de vente en ligne personnalisées (Shopify, WooCommerce, solutions sur mesure)",
        "Gestion de catalogue produits et stocks automatisée",
        "Systèmes de paiement sécurisés et passerelles multiples",
        "Optimisation du tunnel de conversion et du panier d'achat",
        "Intégration avec les systèmes CRM et ERP existants",
        "Fonctionnalités marketing: promotions, codes promo, ventes croisées",
      ],
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
      ),
      delay: 0.3,
      shapes: [{ type: "square", size: 18, color: "#8a2be2", position: 50 }],
    },
  ];

  // Parallax effect for background orbs
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const handleOpenService = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { serviceId } = customEvent.detail;
      setExpandedServiceId(serviceId);
    };

    const handleCloseService = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { serviceId } = customEvent.detail;
      setExpandedServiceId((prev) => (prev === serviceId ? null : prev));
    };

    window.addEventListener("openService", handleOpenService);
    window.addEventListener("closeService", handleCloseService);

    return () => {
      window.removeEventListener("openService", handleOpenService);
      window.removeEventListener("closeService", handleCloseService);
    };
  }, []);

  return (
    <section
      id="services"
      className="py-20 bg-background relative overflow-hidden bg-grid"
    >
      {/* Background effects that follow mouse subtly */}
      <motion.div
        className="absolute top-0 right-0 w-72 h-72 opacity-20"
        style={{
          x: mousePosition.x * -20,
          y: mousePosition.y * -20,
        }}
      >
        <div className="w-full h-full rounded-full bg-accent blur-3xl pulsing" />
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-0 w-96 h-96 opacity-10"
        style={{
          x: mousePosition.x * 20,
          y: mousePosition.y * 20,
        }}
      >
        <div className="w-full h-full rounded-full bg-accent-secondary blur-3xl pulsing" />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealOnScroll>
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center gradient-accent glow mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Nos Services
          </motion.h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <motion.p
            className="text-xl text-secondary text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Des solutions web modernes et sur mesure pour répondre à tous vos
            besoins digitaux. Découvrez nos services ci-dessous.
          </motion.p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 items-start auto-rows-auto">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => toggleServiceDetails(service.id)}
              className="cursor-pointer"
              style={{ height: "auto" }}
            >
              <ServiceCard
                service={service}
                isExpanded={
                  expandedServiceId === service.id ||
                  expandedServiceId === "all"
                }
                mouseX={mouseX}
                mouseY={mouseY}
                onToggle={toggleServiceDetails}
              />
            </div>
          ))}
        </div>

        {/* Centralized toggle button for all services */}
        <div className="flex justify-center mt-12">
          <motion.button
            onClick={toggleAllServices}
            className={`flex items-center justify-center gap-2 px-8 py-3 rounded-full text-base font-medium transition-all duration-300 ${
              expandedServiceId === "all"
                ? "bg-accent/20 text-white hover:bg-accent/30"
                : "bg-card-bg text-accent hover:bg-accent/5"
            } border border-accent/20 shadow-lg`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <span>
              {expandedServiceId === "all"
                ? "Masquer les détails"
                : "Afficher tous les détails"}
            </span>
            <motion.div
              animate={{ rotate: expandedServiceId === "all" ? 180 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </motion.div>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
