import React, { useEffect } from "react";
import { motion } from "framer-motion";

export default function SplashScreen({ finishLoading }) {
  useEffect(() => {
    const timeout = setTimeout(() => finishLoading(), 4500);
    return () => clearTimeout(timeout);
  }, [finishLoading]);

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.5, 
      },
    },
  };

  const childVariants = {
    initial: { y: 40, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <motion.div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#030303", 
        color: "#ffffff"
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <motion.div 
        variants={containerVariants}
        initial="initial"
        animate="animate"
        style={{ textAlign: "center", padding: "0 2rem" }}
      >
        <div style={{ overflow: "hidden", marginBottom: "0.75rem" }}>
          <motion.p
            variants={childVariants}
            style={{
              fontFamily: "'Courier New', Courier, monospace",
              color: "#a5b4fc", 
              fontSize: "clamp(0.95rem, 2.5vw, 1.25rem)",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              fontWeight: "600",
              margin: 0
            }}
          >
            SYSTEM.INIT // WELCOME
          </motion.p>
        </div>

        <div style={{ overflow: "hidden" }}>
          <motion.h1
            variants={childVariants}
            style={{
              fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: "clamp(1.8rem, 6vw, 3.8rem)",
              fontWeight: "900",
              letterSpacing: "-0.03em",
              color: "#ffffff",
              margin: 0,
              textTransform: "uppercase"
            }}
          >
            AMIRTHAMOZHI V S
          </motion.h1>
        </div>

        <motion.div 
          style={{
            height: "2px",
            background: "linear-gradient(to right, transparent, #818cf8, transparent)",
            marginTop: "24px",
            marginLeft: "auto",
            marginRight: "auto"
          }}
          initial={{ width: 0 }}
          animate={{ width: "160px" }}
          transition={{ delay: 1.2, duration: 0.8, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
}