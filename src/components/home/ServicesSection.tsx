"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import RevealOnScroll from "../animations/RevealOnScroll";
import { useLanguage } from "@/context/LanguageContext";

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

function ServiceCard({
  service,
  isExpanded,
  onToggle,
}: {
  service: ServiceData;
  isExpanded: boolean;
  onToggle: (serviceId: string) => void;
}) {
  // Références et états
  const cardRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  const shouldReduceMotion = useReducedMotion();

  // Animation pour l'expansion du contenu
  useEffect(() => {
    if (isExpanded) {
      controls.start({
        scale: shouldReduceMotion ? 1 : 1.01,
        boxShadow: "0 12px 30px rgba(0, 0, 0, 0.15)",
        transition: { duration: shouldReduceMotion ? 0.2 : 0.5, ease: [0.22, 1, 0.36, 1] },
      });
    } else {
      controls.start({
        scale: 1,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        transition: { duration: shouldReduceMotion ? 0.2 : 0.4, ease: [0.22, 1, 0.36, 1] },
      });
    }
  }, [isExpanded, controls, shouldReduceMotion]);

  return (
    <RevealOnScroll delay={service.delay} className="group relative">
      <motion.div
        ref={cardRef}
        className={`flex flex-col rounded-xl overflow-hidden bg-card-bg border ${
          isExpanded ? "border-accent/40" : "border-card-border"
        } shadow-lg relative p-8`}
        style={{
          minHeight: isExpanded ? "none" : "320px",
        }}
        animate={controls}
        whileHover={{ scale: isExpanded ? 1.01 : 1.005 }}
        initial={{ scale: 1 }}
      >
        {/* Toggle button */}
        <motion.div
          className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-accent/10 hover:bg-accent/20 text-accent cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => {
            e.stopPropagation();
            onToggle(service.id);
          }}
        >
          {isExpanded ? (
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
                d="M20 12H4"
              />
            </svg>
          ) : (
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
                d="M12 4v16m8-8H4"
              />
            </svg>
          )}
        </motion.div>

        {/* Background accent for expanded state */}
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
            whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
            animate={
              isExpanded && !shouldReduceMotion
                ? {
                    scale: [1, 1.02, 1],
                  }
                : { scale: 1 }
            }
            transition={{
              duration: 4,
              repeat: isExpanded && !shouldReduceMotion ? Infinity : 0,
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
                  scale: isExpanded && !shouldReduceMotion ? [1, 1.05, 1] : 1,
                }}
                transition={{
                  duration: 3,
                  ease: "easeInOut",
                  repeat: isExpanded && !shouldReduceMotion ? Infinity : 0,
                  repeatType: "reverse",
                  repeatDelay: 1,
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
              Capacités incluses:
            </h4>
            <ul className="space-y-4">
              {service.extendedDescription.map((item, idx) => (
                <motion.li
                  key={idx}
                  className="flex items-start"
                  initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -10 }}
                  animate={{
                    opacity: isExpanded ? 1 : 0,
                    x: isExpanded ? 0 : shouldReduceMotion ? 0 : -10,
                  }}
                  transition={{
                    duration: shouldReduceMotion ? 0.1 : 0.3,
                    delay: isExpanded && !shouldReduceMotion ? Math.min(idx * 0.05, 0.3) : 0,
                    ease: "easeOut",
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

        {/* Simple shape indicator for non-expanded cards */}
        {!isExpanded && service.shapes && service.shapes[0] && (
          <div className="absolute bottom-0 left-0 w-full h-12 overflow-visible">
            <div
              className={`absolute ${
                service.shapes[0].type === "circle"
                  ? "rounded-full"
                  : service.shapes[0].type === "square"
                    ? ""
                    : ""
              }`}
              style={{
                width: `${service.shapes[0].size}px`,
                height: `${service.shapes[0].size}px`,
                backgroundColor: service.shapes[0].color,
                left: `${service.shapes[0].position}%`,
                bottom: `28px`,
                transform:
                  service.shapes[0].type === "square"
                    ? "translateX(-50%) rotate(45deg)"
                    : service.shapes[0].type === "triangle"
                      ? "translateX(-50%)"
                      : "translateX(-50%)",
              }}
            />
          </div>
        )}
      </motion.div>
    </RevealOnScroll>
  );
}

export default function ServicesSection() {
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(
    null
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const { t } = useLanguage();

  // Toggle avec animation fluide
  const toggleServiceDetails = (serviceId: string) => {
    if (isAnimating) return;

    setIsAnimating(true);
    setExpandedServiceId((prev) => (prev === serviceId ? null : serviceId));

    // Délai basé sur la durée de l'animation
    setTimeout(() => {
      setIsAnimating(false);
    }, 550);
  };

  const toggleAllServices = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setExpandedServiceId((prev) => (prev === "all" ? null : "all"));

    // Délai basé sur la durée de l'animation
    setTimeout(() => {
      setIsAnimating(false);
    }, 550);
  };

  const services: ServiceData[] = [
    {
      id: "site-vitrine",
      title: t("services.services.0.title"),
      description: t("services.services.0.description"),
      extendedDescription: [
        t("services.services.0.extendedDescription.0"),
        t("services.services.0.extendedDescription.1"),
        t("services.services.0.extendedDescription.2"),
        t("services.services.0.extendedDescription.3"),
        t("services.services.0.extendedDescription.4"),
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
      title: t("services.services.1.title"),
      description: t("services.services.1.description"),
      extendedDescription: [
        t("services.services.1.extendedDescription.0"),
        t("services.services.1.extendedDescription.1"),
        t("services.services.1.extendedDescription.2"),
        t("services.services.1.extendedDescription.3"),
        t("services.services.1.extendedDescription.4"),
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
      title: t("services.services.2.title"),
      description: t("services.services.2.description"),
      extendedDescription: [
        t("services.services.2.extendedDescription.0"),
        t("services.services.2.extendedDescription.1"),
        t("services.services.2.extendedDescription.2"),
        t("services.services.2.extendedDescription.3"),
        t("services.services.2.extendedDescription.4"),
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

  return (
    <section
      id="services"
      className="py-20 bg-background relative overflow-hidden"
    >
      {/* Simplified background with less opacity */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none"></div>

      {/* Semi-transparent overlay to improve text readability */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm pointer-events-none"></div>

      {/* Accent glow elements with reduced opacity */}
      <div className="absolute top-0 right-0 w-72 h-72 opacity-10">
        <div className="w-full h-full rounded-full bg-accent blur-3xl" />
      </div>

      <div className="absolute bottom-0 left-0 w-96 h-96 opacity-5">
        <div className="w-full h-full rounded-full bg-accent-secondary blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealOnScroll>
          <h2 className="text-3xl md:text-4xl font-bold text-center gradient-accent glow mb-4">
            {t("services.title")}
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <p className="text-xl text-secondary text-center max-w-3xl mx-auto mb-12 bg-background/80 backdrop-blur-sm py-3 px-4 rounded-lg">
            {t("services.subtitle")}
          </p>
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
                onToggle={toggleServiceDetails}
              />
            </div>
          ))}
        </div>

        {/* Simplified toggle button */}
        <div className="flex justify-center mt-12">
          <button
            onClick={toggleAllServices}
            className={`flex items-center justify-center gap-2 px-8 py-3 rounded-full text-base font-medium transition-all duration-300 ${
              expandedServiceId === "all"
                ? "bg-accent/20 text-white hover:bg-accent/30"
                : "bg-card-bg text-accent hover:bg-accent/5"
            } border border-accent/20 shadow-lg`}
          >
            <span>
              {expandedServiceId === "all"
                ? t("services.collapseAll")
                : t("services.expandAll")}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              style={{
                transform:
                  expandedServiceId === "all"
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                transition: "transform 0.5s",
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
