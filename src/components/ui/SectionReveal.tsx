"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function SectionReveal({
  children,
  className = "",
  delay = 0,
}: SectionRevealProps) {
  return (
    <div className="w-full [perspective:1400px]">
      <motion.div
        initial={{
          opacity: 0,
          y: 85,
          scale: 0.91,
          rotateX: 4,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
        }}
        viewport={{
          once: false,
          amount: 0.08,
          margin: "0px 0px -40px 0px",
        }}
        transition={{
          duration: 0.72,
          delay,
          ease: [0.22, 1.22, 0.36, 1], // dynamic pop-up curve with smooth settling
        }}
        className={`w-full will-change-transform ${className}`}
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "center bottom",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
