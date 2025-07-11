"use client";

import React, { useRef, useEffect } from "react";
import { useInView } from "framer-motion";
import RevealOnScroll from "../animations/RevealOnScroll";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface CounterProps {
  end: number;
  suffix?: string;
  title: string;
  description: string;
  duration?: number;
  delay?: number;
}

function Counter({
  end,
  suffix = "",
  title,
  description,
  duration = 2.5,
  delay = 0,
}: CounterProps) {
  const counterRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(counterRef, { once: true });

  useEffect(() => {
    if (!isInView || !counterRef.current) return;

    let startValue = 0;
    const increment = end / (duration * 60);
    const counter = counterRef.current.querySelector(".counter-value");

    if (!counter) return;

    const updateCounter = () => {
      if (startValue < end) {
        startValue += increment;
        counter.textContent = `${Math.floor(startValue)}${suffix}`;
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = `${end}${suffix}`;
      }
    };

    // Delay the start of the counter animation
    setTimeout(() => {
      requestAnimationFrame(updateCounter);
    }, delay * 1000);
  }, [isInView, end, suffix, duration, delay]);

  return (
    <div
      ref={counterRef}
      className="text-center bg-card-bg p-6 rounded-xl border border-border hover:border-accent transition-all duration-300 border-glow"
    >
      <div className="text-3xl md:text-5xl font-bold gradient-accent glow mb-3">
        <span className="counter-value">0{suffix}</span>
      </div>
      <h3 className="text-xl font-medium text-primary mb-2">{title}</h3>
      <p className="text-secondary text-sm">{description}</p>
    </div>
  );
}

export default function GuaranteesSection() {
  const { t } = useLanguage();
  
  const counters = [
    {
      end: 3,
      suffix: t("guarantees.counters.0.suffix"),
      title: t("guarantees.counters.0.title"),
      description: t("guarantees.counters.0.description"),
      delay: 0.2,
    },
    {
      end: 15,
      suffix: t("guarantees.counters.1.suffix"),
      title: t("guarantees.counters.1.title"),
      description: t("guarantees.counters.1.description"),
      delay: 0.4,
    },
    {
      end: 48,
      suffix: t("guarantees.counters.2.suffix"),
      title: t("guarantees.counters.2.title"),
      description: t("guarantees.counters.2.description"),
      delay: 0.6,
    },
  ];

  return (
    <section
      id="garanties"
      className="py-20 bg-background relative overflow-hidden"
    >
      {/* Grille de fond atténuée */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none"></div>

      {/* Overlay semi-transparent pour améliorer la lisibilité */}
      <div className="absolute inset-0 bg-background/85 backdrop-blur-sm pointer-events-none"></div>

      {/* Effets lumineux avec opacité réduite */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-600 rounded-full opacity-5 blur-3xl pulsing"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full opacity-5 blur-3xl pulsing"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealOnScroll>
          <h2 className="text-3xl md:text-4xl font-bold text-center gradient-accent glow mb-4">
            {t("guarantees.title")}
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <p className="text-xl text-secondary text-center max-w-3xl mx-auto mb-16 py-3 px-4 rounded-lg">
            {t("guarantees.subtitle")}
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {counters.map((counter, index) => (
            <RevealOnScroll
              key={index}
              delay={counter.delay}
              className="h-full"
            >
              <Counter
                end={counter.end}
                suffix={counter.suffix}
                title={counter.title}
                description={counter.description}
              />
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll
          direction="up"
          delay={0.8}
          className="max-w-3xl mx-auto mb-16"
        >
          <div className="bg-card-bg p-8 rounded-xl border border-border text-center border-glow shadow-lg">
            <h3 className="text-2xl font-bold mb-4 gradient-accent">
              {t("guarantees.philosophy")}
            </h3>
            <p className="text-secondary mb-6">
              {t("guarantees.philosophyText")}
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-7 py-4 border border-accent text-lg font-bold rounded-md text-white bg-gradient-to-r from-accent via-purple-500 to-blue-500 hover:from-accent/90 hover:via-purple-500/90 hover:to-blue-500/90 transition-all duration-300 shadow-lg hover:shadow-accent/20 hover:shadow-xl hover:scale-105 transform hover:-translate-y-1"
            >
              {t("guarantees.cta")}
              <svg
                className="ml-2 -mr-1 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </a>
          </div>
        </RevealOnScroll>

        {/* Nouvelle section Prix avec fond opaque */}
        <RevealOnScroll
          direction="up"
          delay={0.4}
          className="max-w-4xl mx-auto"
        >
                      <div className="bg-card-bg border border-accent/20 p-10 rounded-2xl shadow-lg">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="lg:w-2/3">
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#ec4899] via-[#8b5cf6] to-[#06b6d4] shadow-lg">
                    {t("guarantees.pricing.title")} <br /> {t("guarantees.pricing.subtitle")}
                  </h3>
                  <p className="text-secondary text-lg mb-6">
                    {t("guarantees.pricing.description")}
                  </p>
                  <ul className="space-y-2 mb-8">
                    {[
                      t("guarantees.pricing.features.0"),
                      t("guarantees.pricing.features.1"),
                      t("guarantees.pricing.features.2"),
                      t("guarantees.pricing.features.3"),
                    ].map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center mr-3 mt-0.5">
                        <svg
                          className="w-3 h-3 text-accent"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-secondary text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:w-1/3 w-full">
                <div className="bg-card-bg rounded-xl p-6 border border-accent/30 shadow-lg text-center relative overflow-hidden">
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-accent/10 rounded-full blur-2xl"></div>
                  <h4 className="text-lg text-secondary font-medium mb-2">
                    Tarification
                  </h4>
                  <div className="text-5xl font-bold gradient-accent glow mb-2">
                    {t("guarantees.pricing.amount")}
                  </div>
                  <p className="text-secondary mb-6">
                    {t("guarantees.pricing.description")}
                  </p>
                  <motion.div className="relative group">
                    <motion.div
                      className="absolute -inset-1 bg-gradient-to-r from-[#ec4899] via-[#8b5cf6] to-[#06b6d4] rounded-lg blur-sm opacity-70 group-hover:opacity-100 transition duration-300"
                      animate={{
                        opacity: [0.7, 0.9, 0.7],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    ></motion.div>
                    <motion.a
                      href="/contact"
                      className="relative block w-full px-5 py-3 text-center text-white font-bold bg-gradient-to-r from-[#ec4899]/80 via-[#8b5cf6]/80 to-[#06b6d4]/80 hover:from-[#ec4899] hover:via-[#8b5cf6] hover:to-[#06b6d4] transition-all duration-300 rounded-lg shadow-xl"
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {t("guarantees.pricing.contact")}
                      <motion.span className="absolute -z-10 inset-0 rounded-lg bg-background/10 backdrop-blur-sm"></motion.span>
                    </motion.a>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
