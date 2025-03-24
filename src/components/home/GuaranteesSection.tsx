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
        "Mes clients sont satisfaits de mon travail et me recommandent à leur entourage.",
      delay: 0.2,
    },
    {
      end: 100,
      suffix: "+",
      title: "Projets Réalisés",
      description:
        "Plus d'une centaine de projets livrés avec succès pour des clients aux besoins variés.",
      delay: 0.4,
    },
    {
      end: 24,
      suffix: "/7",
      title: "Disponibilité",
      description:
        "Je reste accessible et réponds rapidement à vos questions, même en dehors des heures de bureau.",
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
            Un vrai engagement
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <p className="text-xl text-secondary text-center max-w-3xl mx-auto mb-16 py-3 px-4 rounded-lg">
            Avec une approche personnalisée et des outils modernes, votre
            free-lance vous offrera un service de qualité à un tarif accessible.
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
              Une Promesse
            </h3>
            <p className="text-secondary mb-6">
              Un free-lance qui s&apos;engage vous engage à livrer votre projet
              dans les délais et le budget convenus. Votre satisfaction est une
              priorité, je resterai disponible après la livraison pour
              m&apos;assurer que tout fonctionne parfaitement.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-7 py-4 border border-accent text-lg font-bold rounded-md text-white bg-gradient-to-r from-accent via-purple-500 to-blue-500 hover:from-accent/90 hover:via-purple-500/90 hover:to-blue-500/90 transition-all duration-300 shadow-lg hover:shadow-accent/20 hover:shadow-xl hover:scale-105 transform hover:-translate-y-1"
            >
              Contactez-moi
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
                <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-accent via-purple-200 to-blue-500">
                  Le web évolue, <br /> votre site doit suivre
                </h3>
                <p className="text-secondary text-lg mb-6">
                  Ne laissez pas votre site web devenir obsolète. Un site
                  moderne et performant vous aide à vous démarquer et à attirer
                  de nouveaux clients. Je vous accompagne pour créer une
                  présence en ligne qui vous ressemble vraiment.
                </p>
                <ul className="space-y-2 mb-8">
                  {[
                    "Design responsive parfaitement adapté à tous les écrans",
                    "Optimisation des performances pour un meilleur référencement",
                    "Expérience utilisateur intuitive qui convertit vos visiteurs",
                    "Suivi et maintenance pour garder votre site à jour",
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
                    Un investissement unique pour booster votre présence en
                    ligne
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
