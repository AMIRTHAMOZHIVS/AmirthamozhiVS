import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import * as THREE from "three";

function ParticleVortex() {
  const pointsRef = useRef();
  const count = 380;
  
  // Track continuous mouse position vector coordinates
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize values between -1 and 1
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
      const radius = THREE.MathUtils.randFloat(1.5, 5.5);
      pos[i * 3] = Math.cos(theta) * radius;
      pos[i * 3 + 1] = THREE.MathUtils.randFloat(-3, 3);
      pos[i * 3 + 2] = Math.sin(theta) * radius;
    }
    return pos;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Default rotation loop
    pointsRef.current.rotation.y = time * 0.12;
    pointsRef.current.rotation.x = Math.sin(time * 0.05) * 0.1;

    // OPTION 3: Interactive mouse influence vector calculation
    // Gently lag/interpolate target points toward mouse coordinate offsets
    pointsRef.current.position.x += (mouse.current.x * 0.5 - pointsRef.current.position.x) * 0.05;
    pointsRef.current.position.y += (mouse.current.y * 0.5 - pointsRef.current.position.y) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#818cf8"
        size={0.065}
        sizeAttenuation={true}
        transparent
        opacity={0.75}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function SplashScreen({ finishLoading }) {
  useEffect(() => {
    const timeout = setTimeout(() => finishLoading(), 4500);
    return () => clearTimeout(timeout);
  }, [finishLoading]);

  return (
    <motion.div
      className="splash-wrapper"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="splash-3d-container">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <ParticleVortex />
        </Canvas>
      </div>

      <div className="splash-ui-overlay">
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.35em" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="splash-subtitle"
        >
          CORE.CORE_INIT // MATRIX INFRASTRUCTURE
        </motion.p>

        <div className="splash-headline-mask" style={{ display: "flex", justifyContent: "center", gap: "0.15em" }}>
          {"AMIRTHAMOZHI V S".split("").map((letter, index) => (
            <motion.span
              key={index}
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.4 + index * 0.04,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
              }}
              style={{
                display: "inline-block",
                fontSize: "clamp(1.8rem, 6vw, 3.5rem)",
                fontWeight: "900",
                letterSpacing: "-0.01em",
                color: "#ffffff",
                textTransform: "uppercase",
                whiteSpace: letter === " " ? "pre" : "normal"
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        <div className="splash-hud-loader">
          <motion.div 
            className="splash-hud-fill"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3.8, ease: "easeInOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}