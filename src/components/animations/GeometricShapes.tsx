"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Interface pour les formes
interface Shape {
  type: string;
  size: string;
  color: string;
  delay: number;
  duration: number;
  position: {
    x: number;
    y: number;
  };
  endPosition: {
    x: number;
    y: number;
  };
}

// Composant pour les formes géométriques colorées
export default function GeometricShapes() {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Effect pour initialiser les formes côté client uniquement
  useEffect(() => {
    setIsClient(true);

    // Couleurs tirées de globals.css
    const colors = [
      "#00bfff", // --accent-cyan
      "#8a2be2", // --accent-violet
    ];

    // Générer les formes avec des positions aléatoires statiques
    const generateShapes = () => {
      const generatedShapes: Shape[] = [];

      // Créer des cercles
      for (let i = 0; i < 4; i++) {
        generatedShapes.push({
          type: "circle",
          size: `${3 + i}rem`,
          color: colors[i % 2],
          delay: i * 2,
          duration: 15 + i * 3,
          position: {
            x: Math.floor(Math.random() * 90),
            y: Math.floor(Math.random() * 90),
          },
          endPosition: {
            x: Math.floor(Math.random() * 90),
            y: Math.floor(Math.random() * 90),
          },
        });
      }

      // Créer des carrés
      for (let i = 0; i < 3; i++) {
        generatedShapes.push({
          type: "square",
          size: `${3 + i}rem`,
          color: colors[(i + 1) % 2],
          delay: i * 3,
          duration: 12 + i * 4,
          position: {
            x: Math.floor(Math.random() * 90),
            y: Math.floor(Math.random() * 90),
          },
          endPosition: {
            x: Math.floor(Math.random() * 90),
            y: Math.floor(Math.random() * 90),
          },
        });
      }

      // Créer des triangles
      for (let i = 0; i < 3; i++) {
        generatedShapes.push({
          type: "triangle",
          size: `${3 + i}rem`,
          color: colors[i % 2],
          delay: i * 2.5,
          duration: 14 + i * 3,
          position: {
            x: Math.floor(Math.random() * 90),
            y: Math.floor(Math.random() * 90),
          },
          endPosition: {
            x: Math.floor(Math.random() * 90),
            y: Math.floor(Math.random() * 90),
          },
        });
      }

      return generatedShapes;
    };

    setShapes(generateShapes());
  }, []);

  if (!isClient) {
    return null; // Ne rien rendre côté serveur pour éviter les erreurs d'hydratation
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[30]">
      {shapes.map((shape, index) => {
        // Rendu conditionnel selon le type de forme
        let shapeElement;

        if (shape.type === "circle") {
          shapeElement = (
            <motion.div
              className="rounded-full absolute"
              style={{
                width: shape.size,
                height: shape.size,
                backgroundColor: shape.color,
                filter: `blur(8px) opacity(0.7)`,
                mixBlendMode: "screen",
              }}
            />
          );
        } else if (shape.type === "square") {
          shapeElement = (
            <motion.div
              className="absolute"
              style={{
                width: shape.size,
                height: shape.size,
                backgroundColor: shape.color,
                filter: `blur(8px) opacity(0.7)`,
                mixBlendMode: "screen",
              }}
            />
          );
        } else if (shape.type === "triangle") {
          const sizeValue = parseInt(shape.size);
          shapeElement = (
            <motion.div
              className="absolute"
              style={{
                width: 0,
                height: 0,
                borderLeft: `${sizeValue / 2}px solid transparent`,
                borderRight: `${sizeValue / 2}px solid transparent`,
                borderBottom: `${sizeValue}px solid ${shape.color}`,
                filter: `blur(8px) opacity(0.7)`,
                mixBlendMode: "screen",
              }}
            />
          );
        }

        return (
          <motion.div
            key={index}
            className="absolute"
            initial={{
              left: `${shape.position.x}%`,
              top: `${shape.position.y}%`,
              opacity: 0,
              scale: 0.5,
            }}
            animate={{
              left: [`${shape.position.x}%`, `${shape.endPosition.x}%`],
              top: [`${shape.position.y}%`, `${shape.endPosition.y}%`],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.2, 0.5],
              rotate: [0, 180],
            }}
            transition={{
              duration: shape.duration,
              repeat: Infinity,
              repeatType: "mirror",
              delay: shape.delay,
              ease: "easeInOut",
            }}
          >
            {shapeElement}
          </motion.div>
        );
      })}
    </div>
  );
}
