"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ResponsiveIframeViewer, ViewportSize } from "react-responsive-iframe-viewer";
import RevealOnScroll from "../animations/RevealOnScroll";
import { useLanguage } from "@/context/LanguageContext";

interface Project {
  id: string;
  title: string;
  description: string;
  siteUrl: string; // URL for the iframe
  liveUrl: string;
  category: string;
  technologies: string[];
}

export default function ProjectsSection() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { t } = useLanguage();

  const projects: Project[] = [
    {
      id: "1",
      title: t("projects.projects.0.title"),
      description: t("projects.projects.0.description"),
      siteUrl: "https://projetk.vercel.app/",
      liveUrl: "https://projetk.vercel.app/",
      category: t("projects.projects.0.category"),
      technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
    },
    {
      id: "2",
      title: t("projects.projects.1.title"),
      description: t("projects.projects.1.description"),
      siteUrl: "https://color-burst-hero-splash.lovable.app/",
      liveUrl: "https://color-burst-hero-splash.lovable.app/",
      category: t("projects.projects.1.category"),
      technologies: ["React", "Next.js", "Tailwind CSS"],
    },
    {
      id: "3",
      title: t("projects.projects.2.title"),
      description: t("projects.projects.2.description"),
      siteUrl: "https://projetk.vercel.app/",
      liveUrl: "https://projetk.vercel.app/",
      category: t("projects.projects.2.category"),
      technologies: ["Next.js", "GSAP", "Tailwind CSS"],
    },
  ];

  const navigate = (newDirection: number) => {
    setIsLoading(true);
    setDirection(newDirection);
    setCurrentIdx((prev) => {
      const nextIndex = prev + newDirection;
      if (nextIndex < 0) return projects.length - 1;
      if (nextIndex >= projects.length) return 0;
      return nextIndex;
    });
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const currentProject = projects[currentIdx];

  return (
    <section
      id="realisations"
      className="py-20 relative bg-background overflow-hidden bg-dots"
    >
      {/* Background elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl opacity-30 pulsing"></div>
      <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl opacity-30 pulsing"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealOnScroll>
          <h2 className="text-3xl md:text-4xl font-bold text-center gradient-accent glow mb-4">
            {t("projects.title")}
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <p className="text-xl text-secondary text-center max-w-3xl mx-auto mb-16">
            {t("projects.subtitle")}
          </p>
        </RevealOnScroll>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10">
          {/* Project Showcase as an iframe - desktop view */}
          <div className="flex-1 relative overflow-hidden h-[700px] border border-border rounded-xl shadow-lg border-glow bg-card-bg hidden md:block">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentProject.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute top-0 left-0 w-full h-full"
              >
                {/* Loading indicator */}
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-card-bg z-10">
                    <div className="flex flex-col items-center">
                      <svg
                        className="animate-spin h-10 w-10 text-accent mb-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <p className="text-secondary">{t("projects.loading")}</p>
                    </div>
                  </div>
                )}

                {/* Site iframe with sandbox for security */}
                <iframe
                  ref={iframeRef}
                  src={currentProject.siteUrl}
                  onLoad={handleIframeLoad}
                  className="w-full h-full border-0"
                  sandbox="allow-same-origin allow-scripts"
                  title={`${t("projects.loading")} ${currentProject.title}`}
                />

                {/* Overlay with project info - now with hover behavior inverted */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent transition-opacity duration-300"
                  initial={{ opacity: 0.3 }}
                  whileHover={{ opacity: 1 }}
                >
                  <span className="inline-block px-3 py-1 bg-accent rounded-full text-xs text-white font-semibold mb-2">
                    {currentProject.category}
                  </span>
                  <h3 className="text-white text-2xl font-bold mb-2">
                    {currentProject.title}
                  </h3>
                  <p className="text-gray-200 mb-4 text-sm">
                    {currentProject.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {currentProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 rounded bg-background/30 text-white"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href={currentProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-white font-medium border-b border-accent hover:border-white transition-colors"
                  >
                    {t("projects.visitSite")}
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      ></path>
                    </svg>
                  </a>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <button
              onClick={() => navigate(-1)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-background/30 backdrop-blur-sm text-white flex items-center justify-center hover:bg-accent/80 transition-colors z-10 border-glow"
              aria-label="Projet précédent"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
            </button>
            <button
              onClick={() => navigate(1)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-background/30 backdrop-blur-sm text-white flex items-center justify-center hover:bg-accent/80 transition-colors z-10 border-glow"
              aria-label="Projet suivant"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </button>
          </div>

          {/* Mobile responsive iframe view */}
          <div className="flex-1 md:hidden border border-border rounded-xl shadow-lg border-glow bg-card-bg overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentProject.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="relative"
              >
                <div className="relative">
                  {/* Mobile responsive iframe container */}
                  <div className="relative" style={{ height: '400px' }}>
                    {/* Loading indicator */}
                    {isLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-card-bg z-20">
                        <div className="flex flex-col items-center">
                          <svg
                            className="animate-spin h-8 w-8 text-accent mb-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          <p className="text-secondary text-sm">{t("projects.loading")}</p>
                        </div>
                      </div>
                    )}

                    {/* Responsive iframe viewer for mobile */}
                    <ResponsiveIframeViewer
                      src={currentProject.siteUrl}
                      title={currentProject.title}
                      size={ViewportSize.mobile}
                      showControls={false}
                      allowResizingX={false}
                      allowResizingY={false}
                      fluidX={true}
                      onIframeLoad={handleIframeLoad}
                    />

                    {/* Navigation buttons for mobile */}
                    <button
                      onClick={() => navigate(-1)}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-background/50 backdrop-blur-sm text-white flex items-center justify-center hover:bg-accent/80 transition-colors z-30 border-glow"
                      aria-label="Projet précédent"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 19l-7-7 7-7"
                        ></path>
                      </svg>
                    </button>
                    <button
                      onClick={() => navigate(1)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-background/50 backdrop-blur-sm text-white flex items-center justify-center hover:bg-accent/80 transition-colors z-30 border-glow"
                      aria-label="Projet suivant"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        ></path>
                      </svg>
                    </button>
                  </div>

                  {/* Project info section */}
                  <div className="p-6 bg-card-bg">
                    <span className="inline-block px-3 py-1 bg-accent rounded-full text-xs text-white font-semibold mb-2">
                      {currentProject.category}
                    </span>
                    <h3 className="text-white text-2xl font-bold mb-2">
                      {currentProject.title}
                    </h3>
                    <p className="text-gray-200 mb-4 text-sm">
                      {currentProject.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {currentProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-1 rounded bg-background/30 text-white"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <a
                      href={currentProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full py-3 px-4 mt-2 text-sm text-white font-medium bg-accent hover:bg-accent/80 rounded-md transition-colors"
                    >
                      {t("projects.visitSite")}
                      <svg
                        className="ml-2 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        ></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Project indicators */}
        <div className="flex justify-center mt-6 space-x-2">
          {projects.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIdx ? 1 : -1);
                setIsLoading(true);
                setCurrentIdx(idx);
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === currentIdx
                  ? "bg-accent w-6 glow"
                  : "bg-gray-600 hover:bg-gray-400"
              }`}
              aria-label={`Aller au projet ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
