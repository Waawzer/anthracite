"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, PresentationControls } from "@react-three/drei";
import { Group } from "three";
import { motion } from "framer-motion-3d";
import { MotionConfig } from "framer-motion";

function GeometricObjects() {
  const group = useRef<Group>(null);

  // Animation loop
  useFrame((state) => {
    if (!group.current) return;

    // Subtly rotate based on mouse position
    const mouseX = state.mouse.x * 0.1;
    const mouseY = state.mouse.y * 0.1;

    group.current.rotation.y += 0.001;
    group.current.rotation.x = mouseY * 0.2;
    group.current.rotation.y = mouseX * 0.2;
  });

  return (
    <group ref={group}>
      {/* Floating cubes with different sizes and positions */}
      <Float speed={4} rotationIntensity={0.2} floatIntensity={0.5}>
        <motion.mesh
          position={[0, 0, 0]}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color="hsl(200, 100%, 60%)"
            roughness={0.1}
            metalness={0.8}
          />
        </motion.mesh>
      </Float>

      <Float speed={2.5} rotationIntensity={0.5} floatIntensity={0.3}>
        <motion.mesh
          position={[-2, 1, -1]}
          rotation={[0.5, 0.5, 0]}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <dodecahedronGeometry args={[0.6, 0]} />
          <meshStandardMaterial
            color="hsl(260, 100%, 60%)"
            roughness={0.3}
            metalness={0.6}
          />
        </motion.mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.2}>
        <motion.mesh
          position={[2, -1, 1]}
          rotation={[0.2, 0.3, 0]}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <octahedronGeometry args={[0.8, 0]} />
          <meshStandardMaterial
            color="hsl(170, 100%, 50%)"
            roughness={0.2}
            metalness={0.7}
          />
        </motion.mesh>
      </Float>

      <Float speed={3} rotationIntensity={0.6} floatIntensity={0.4}>
        <motion.mesh
          position={[1, 2, -2]}
          rotation={[0.4, 0.2, 0]}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <tetrahedronGeometry args={[0.7, 0]} />
          <meshStandardMaterial
            color="hsl(30, 100%, 60%)"
            roughness={0.2}
            metalness={0.5}
          />
        </motion.mesh>
      </Float>
    </group>
  );
}

export default function GeometricScene() {
  return (
    <div className="w-full h-full absolute inset-0 -z-10">
      <MotionConfig
        transition={{
          type: "spring",
          mass: 5,
          stiffness: 500,
          damping: 50,
          restDelta: 0.001,
        }}
      >
        <Canvas
          gl={{ antialias: true, alpha: true }}
          camera={{ position: [0, 0, 10], fov: 40 }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.5} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={1}
          />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />

          <PresentationControls
            global
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
            speed={1.5}
            zoom={1.2}
          >
            <GeometricObjects />
          </PresentationControls>

          <Environment preset="city" />
        </Canvas>
      </MotionConfig>
    </div>
  );
}
