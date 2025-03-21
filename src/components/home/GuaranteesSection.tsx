"use client";

import React, { useRef, useEffect } from "react";
import { useInView } from "framer-motion";
import RevealOnScroll from "../animations/RevealOnScroll";
import { motion } from "framer-motion";

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
  const counters = [
    {
      end: 98,
      suffix: "%",
      title: "Satisfaction Client",
      description:
        "Nos clients sont satisfaits de notre travail et recommandent nos services.",
      delay: 0.2,
    },
    {
      end: 100,
      suffix: "+",
      title: "Projets Réalisés",
      description:
        "Plus d'une centaine de projets livrés avec succès pour des clients variés.",
      delay: 0.4,
    },
    {
      end: 24,
      suffix: "/7",
      title: "Support Technique",
      description:
        "Une équipe dédiée à votre service pour répondre à toutes vos questions.",
      delay: 0.6,
    },
  ];

  return (
    <section
      id="garanties"
      className="py-20 bg-background relative overflow-hidden bg-grid"
    >
      {/* Effets lumineux */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-600 rounded-full opacity-10 blur-3xl pulsing"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full opacity-10 blur-3xl pulsing"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealOnScroll>
          <h2 className="text-3xl md:text-4xl font-bold text-center gradient-accent glow mb-4">
            Nos Garanties
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <p className="text-xl text-secondary text-center max-w-3xl mx-auto mb-16">
            Les récentes avancées en IA permettent de vous proposer un service
            de très haute qualité pour un prix abordable.
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
          <div className="bg-card-bg p-8 rounded-xl border border-border text-center border-glow">
            <h3 className="text-2xl font-bold mb-4 gradient-accent">
              Notre Promesse
            </h3>
            <p className="text-secondary mb-6">
              Nous nous engageons à livrer des projets de haute qualité, dans
              les délais et le budget convenus. Votre satisfaction est notre
              priorité absolue et nous travaillons sans relâche pour dépasser
              vos attentes.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-accent hover:bg-accent-secondary transition-colors duration-300 shadow-lg hover:shadow-xl border-glow"
            >
              Contactez-nous
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

        {/* Nouvelle section Prix */}
        <RevealOnScroll
          direction="up"
          delay={0.4}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-br from-accent/10 to-primary/5 p-10 rounded-2xl border border-accent/20 shadow-lg">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="lg:w-2/3">
                <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-accent via-purple-500 to-blue-500">
                  Le monde évolue, <br /> votre site doit évoluer aussi
                </h3>
                <p className="text-secondary text-lg mb-6">
                  Restez à la pointe de la technologie avec un site moderne,
                  performant et adapté aux attentes actuelles de vos clients. Ne
                  laissez pas votre présence en ligne devenir obsolète dans un
                  monde digital en constante évolution.
                </p>
                <ul className="space-y-2 mb-8">
                  {[
                    "Conception responsive adaptée à tous les appareils",
                    "Performances optimisées pour un meilleur référencement",
                    "Design moderne et expérience utilisateur intuitive",
                    "Mises à jour régulières et maintenance incluse",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg
                        className="h-5 w-5 text-accent mt-1 mr-2 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:w-1/3 w-full">
                <div className="bg-card-bg rounded-xl p-6 border border-accent/30 shadow-lg text-center relative overflow-hidden">
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-accent/10 rounded-full blur-2xl"></div>
                  <h4 className="text-lg text-secondary font-medium mb-2">
                    À partir de
                  </h4>
                  <div className="text-5xl font-bold gradient-accent glow mb-2">
                    200€
                  </div>
                  <p className="text-secondary mb-6">
                    Investissement unique pour votre présence en ligne
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
                      Obtenir un devis gratuit
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
